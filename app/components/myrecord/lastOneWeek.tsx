"use client"

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getMyAllRecord } from "@/src/getMyAllRecord";
import { Record } from "@/lib/type/record";
import { format, subDays, addDays } from "date-fns";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// 日ごとの集計結果の型
type DaySummary = {
  dateLabel: string;     // "09/01" みたいな表示用
  totalMinutes: number;  // 合計学習時間（分）
};

// ---- 指定した週の7日分を集計する関数（例）----
function aggregateOneWeek(records: Record[], weekOffset: number): DaySummary[] {
  const today = new Date();
  // weekOffset が 0 のとき → 今日を含む過去7日間
  // -1 のとき → その1週前、という感じ
  const start = new Date(today);
  start.setDate(start.getDate() - 6 + weekOffset * 7);
  const end = new Date(today);
  end.setDate(today.getDate() + weekOffset * 7);

  // ここで records を start〜end の範囲で集計して日ごとにまとめる処理を書く
  const baseDate = addDays(today, weekOffset * 7);

  // その週の開始日（baseDateから6日前）
  const startDate = subDays(baseDate, 6);

  // 7日分作成
  const oneWeek = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(startDate, i);
    const key = format(date, "yyyy-MM-dd");

    // その日の記録だけ抽出
    const dayRecords = records.filter(
      (r) => format(new Date(r.created_at), "yyyy-MM-dd") === key
    );

    // 合計時間を計算
    const totalMinutes = dayRecords.reduce((sum, r) => sum + r.time, 0);

    // "09/25(木)" のようなラベルを作る
    // Use format with locale by importing 'format' from 'date-fns/locale/ja' if needed, or use toLocaleDateString
    const dayOfWeekJa = date.toLocaleDateString("ja-JP", { weekday: "short" });
    const dateLabel = `${format(date, "MM/dd")}\n(${dayOfWeekJa})`;

    return {
      // dateLabel: format(date, "MM/dd"),
      dateLabel,
      totalMinutes,
    };
  });

  // ↓仮の戻り値（実装はユーザーの aggregateLast7Days を参考に）
  return oneWeek;
}

export default function LastOneWeekRecordCard() {
  const [days, setDays] = useState<DaySummary[]>([]);
  const [totalLabel, setTotalLabel] = useState<string>("");
  const [weekOffset, setWeekOffset] = useState(0); // ← 週のオフセット
  const { loginUser } = useAuthContext();

  useEffect(() => {
    const fetchWeekRecords = async () => {
      if (!loginUser?.id) return;
      const result = await getMyAllRecord(loginUser.id);
      console.log(result);
      const weekDays = aggregateOneWeek(result, weekOffset);
      setDays(weekDays);

      // 合計時間
      const totalMinutes = weekDays.reduce((sum, d) => sum + d.totalMinutes, 0);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const total =
        (hours > 0 ? `${hours}時間` : "") +
        (minutes > 0 ? `${minutes}分` : "");
      setTotalLabel(total);
    };
    fetchWeekRecords();
  }, [loginUser, weekOffset]);

  return (
    <>
      <div className="weekRecordContainer">
        <div className="weekRecordHeader flex items-center gap-4">
          <h3>過去1週間の記録</h3>
          {totalLabel ? (
            <p>{totalLabel}</p>
          ) : (
            <p>😭</p>
          )

          }
        </div>

        <div className="weekRecordDays">
          {days.map((d, i) => (
            <div key={i} className="weekRecordDay">
              <div
                className="weekRecordDate"
                style={{
                color: d.dateLabel.includes("土") || d.dateLabel.includes("日") ? "rgb(255, 100, 100)" : "#555"
                }}
              >
                {d.dateLabel}
              </div>
              <div className="weekRecordStatus">
                {d.totalMinutes > 0 ? "✅" : "😿"}
              </div>
              <div className="weekRecordTime">
                {d.totalMinutes > 0
                  ? `${Math.floor(d.totalMinutes / 60)}h${d.totalMinutes % 60}m`
                  : "0m"}
              </div>
            </div>
          ))}
        </div>

        <div className="weekRecordArrowContainer">
          <button className="weekRecordArrow" onClick={() => setWeekOffset(weekOffset - 1)}><NavigateBeforeIcon sx={{fontSize:"26px"}}/></button>
          <button
            className="weekRecordArrow"
            onClick={() => setWeekOffset(weekOffset + 1)}
            disabled={weekOffset >= 0} // 未来には進めない
          >
            <NavigateNextIcon sx={{fontSize:"26px"}}/>
          </button>
        </div>
      </div>
    </>
  );
}
