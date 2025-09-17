"use client"

import { getMyTodayRecord } from "@/src/getMyTodayRecord";
import { useEffect, useState } from "react";
import { aggregateLast7Days } from "@/src/aggregateLast7Days";
import { useAuthContext } from "@/context/AuthContext";

// 日ごとの集計結果の型
type DaySummary = {
  dateLabel: string;     // "09/01" みたいな表示用
  totalMinutes: number;  // 合計学習時間（分）
};

export default function LastOneWeekRecordCard() {
  const [days, setDays] = useState<DaySummary[]>([])
  const [totalLabel, setTotalLabel] = useState<string>("")
  const {loginUser} = useAuthContext()

  // 過去7日間の記録を取得
  useEffect(() => {
    const getMyLastWeek = async() => {
      if(!loginUser?.id) return null;
      const result = await getMyTodayRecord(loginUser.id);
      const days = await aggregateLast7Days(result);
      setDays(days);

      // 1週間の合計時間（分）
      const totalMinutes = days.reduce((sum, d) => sum + d.totalMinutes, 0);

      // "24時間30分" のようにフォーマット
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const total =
        (hours > 0 ? `${hours}時間` : "") + (minutes > 0 ? `${minutes}分` : "");
      setTotalLabel(total);

    }
    getMyLastWeek()
  }, [])


  return(
    <>
      <div className="weekRecordContainer">
        <div className="weekRecordHeader">
          <h3>過去1週間の記録</h3>
          <p>{totalLabel}</p>
        </div>
        <div className="weekRecordDays">
          {days.map((d, i) => (
            <div key={i} className="weekRecordDay">
              <div className="weekRecordDate">{d.dateLabel}</div>
              <div className="weekRecordStatus">
                {d.totalMinutes > 0 ? "✅" : "😭"}
              </div>
              <div className="weekRecordTime">
                {d.totalMinutes > 0
                  ? `${Math.floor(d.totalMinutes / 60)}h${d.totalMinutes % 60}m`
                  : "0m"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )


}
