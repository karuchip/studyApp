"use client"
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getMyAllRecord } from "@/src/getMyAllRecord";
import { Record } from "@/lib/type/record";
import { format, addDays, startOfMonth, endOfMonth } from "date-fns";
import {StudyCalendar} from "@/app/components/myrecord/studyCalender";
import Loading from "@/app/components/tool/loading";
import SelectMenu from "@/app/components/tool/menu";

// 日ごとの集計結果の型
type DaySummary = {
  month: number;
  date: number;
  weekName: string;
  totalMinutes: number;  // 合計学習時間（分）
};


type MonthlySummaries = DaySummary[][];

//月毎にまとめる関数
export function groupMonthlySummaries(records: Record[]): MonthlySummaries {
  if (records.length === 0) return [];

  // 日付順にソート
  const sorted = [...records].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const grouped: MonthlySummaries = [];

  // 含まれる全ての「年月」を抽出
  const uniqueMonths = Array.from(
    new Set(
      sorted.map((r) => {
        const d = new Date(r.created_at);
        return `${d.getFullYear()}-${d.getMonth() + 1}`;
      })
    )
  );

  for (const monthKey of uniqueMonths) {
    const [year, month] = monthKey.split("-").map(Number);

    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(new Date(year, month - 1));

    const days: DaySummary[] = [];

    for (let d = start; d <= end; d = addDays(d, 1)) {
      const key = format(d, "yyyy-MM-dd");

      // その日の記録を抽出
      const dayRecords = records.filter(
        (r) => format(new Date(r.created_at), "yyyy-MM-dd") === key
      );

      // 合計時間
      const totalMinutes = dayRecords.reduce((sum, r) => sum + r.time, 0);

      // 各要素を分割して保持
      const weekName = d.toLocaleDateString("ja-JP", { weekday: "short" });
      const date = d.getDate();

      days.push({
        month,
        date,
        weekName,
        totalMinutes,
      });
    }

    grouped.push(days);
  }

  return grouped;
}

const MonthlyReport = () => {

    const { loginUser } = useAuthContext();
    const [ groupMonthly, setGroupMonthly] = useState<DaySummary[][]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

      const fetchWeekRecords = async () => {
        if (!loginUser?.id) return;
        setLoading(true);

        // データ取得
        const result = await getMyAllRecord(loginUser.id);
        // データ整形
        const monthResult = groupMonthlySummaries(result);
        setGroupMonthly(monthResult);

        setLoading(false);
      }

      fetchWeekRecords();
    }, [loginUser?.id]);

if(loading) {
  return<Loading/>
}

  return (
    <>
    {loginUser?.id && (
      <SelectMenu userId={loginUser.id}/>
    )}

      <p className="co-pageTitle">Monthly Records</p>

      <div className="min-h-screen bg-[#FFFFFF] p-4 pb-15">

        {groupMonthly.map((monthDays, index) => (
          <div key={index} className="mb-6">
            <StudyCalendar days={monthDays} />
          </div>
        ))}
      </div>
    </>
  );
}

export default MonthlyReport
