"use client"
// import { useState, useEffect } from "react";
// import { useAuthContext } from "@/context/AuthContext";
// import { getMyAllRecord } from "@/src/getMyAllRecord";
// import { Record } from "@/lib/type/record";
// import { format } from "date-fns";
// import { ja } from "date-fns/locale";


// 日ごとの集計結果の型
// type DaySummary = {
//   dateLabel: string;     // "09/01" みたいな表示用
//   totalMinutes: number;  // 合計学習時間（分）
// };

//月毎にまとめる関数
// function groupMonthlySummaries(records: Record[]) {
//   if (records.length === 0) return [];

//   // 日付順にソート
//   const sorted = [...records].sort(
//     (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
//   );

//   const monthlyGroups: { dateLabel: string; totalMinutes: number }[][] = [];
//   let currentMonthKey = "";
//   let currentGroup: { dateLabel: string; totalMinutes: number }[] = [];

//   // ユニークな日付一覧を作る
//   const uniqueDates = Array.from(
//     new Set(sorted.map((r) => format(new Date(r.created_at), "yyyy-MM-dd")))
//   );

//   for (const dateStr of uniqueDates) {
//     const date = new Date(dateStr);
//     const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

//     // 月が変わったら新しいグループを作る
//     if (monthKey !== currentMonthKey) {
//       if (currentGroup.length > 0) monthlyGroups.push(currentGroup);
//       currentGroup = [];
//       currentMonthKey = monthKey;
//     }

//     // その日の合計時間
//     const dayRecords = records.filter(
//       (r) => format(new Date(r.created_at), "yyyy-MM-dd") === dateStr
//     );
//     const totalMinutes = dayRecords.reduce((sum, r) => sum + r.time, 0);

//     // 日付ラベル作成 (例: "10/01(水)")
//     const dayOfWeekJa = date.toLocaleDateString("ja-JP", { weekday: "short" });
//     const dateLabel = `${format(date, "MM/dd")}\n(${dayOfWeekJa})`;

//     currentGroup.push({ dateLabel, totalMinutes });
//   }

//   // 最後のグループを追加
//   if (currentGroup.length > 0) monthlyGroups.push(currentGroup);

//   return monthlyGroups;
// }

const MonthlyReport = () => {
  // const [monthlyReport, setMonthlyReport] = useState<DaySummary[][]>([]);
  //   const [totalLabel, setTotalLabel] = useState<string>("");
  //   const { loginUser } = useAuthContext();

  //   useEffect(() => {
  //     const fetchWeekRecords = async () => {
  //       if (!loginUser?.id) return;
  //       const result = await getMyAllRecord(loginUser.id);
  //       console.log(result);

  //       const monthlyReport = groupMonthlySummaries(result);
  //       setMonthlyReport(monthlyReport);
  //     }


      //   // 今月の合計時間
      //   const totalMinutes = weekDays.reduce((sum, d) => sum + d.totalMinutes, 0);
      //   const hours = Math.floor(totalMinutes / 60);
      //   const minutes = totalMinutes % 60;
      //   const total =
      //     (hours > 0 ? `${hours}時間` : "") +
      //     (minutes > 0 ? `${minutes}分` : "");
      //   setTotalLabel(total);
      // };
    //   fetchWeekRecords();
    // }, []);

  return(
    <>
      <h1>月間記録</h1>
    </>
  )
}

export default MonthlyReport
