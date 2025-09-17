"use client"
import { useAuthContext } from "@/context/AuthContext";
import formatDateWithDay from "@/src/getDate";
import { getMyTodayRecord } from "@/src/getMyTodayRecord";
import React, { useEffect, useState } from "react";

type Record = {
  id: string;
  created_at: string;
  time: number;
  feeling: number;
  comment?: string;
  material: {
    name: string;
    category: {
      name: string
    }
  };
  user: { name: string };
};

export default function TodayRecordCard() {

  const [records, setRecords] = useState<Record[]>([])
  const {loginUser} = useAuthContext()
  const [today, setToday] = useState("");

  // 今日の記録情報を取得
  useEffect(() => {
    const getMyToday = async() => {
      if(!loginUser?.id) return null;
      const result = await getMyTodayRecord(loginUser.id)
      setRecords(result)
    }
    getMyToday()
    // 今日の日付を取得
    const todayDate = formatDateWithDay();
    setToday(todayDate);
  }, []);

  // 集計
  const totalMinutes = records.reduce((sum, r) => sum + r.time, 0);

  const toHoursMinutes = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}時間${m}分`;
  };

  // カラーリスト（ループさせる方式）
  const colors = ["#5eead4", "#fde68a", "#f9a8d4", "#93c5fd", "#fca5a5"];


  // カテゴリーごとに時間を集計
  const categoryMinutes = new Map<string, number>()
  for (let i=0; i<records.length; i++) {
    const categoryName = records[i].material.category.name;
    const time = records[i].time;

    if (categoryMinutes.has(categoryName)) {
      categoryMinutes.set(categoryName, categoryMinutes.get(categoryName)! + time);
    } else {
      categoryMinutes.set(categoryName, time);
    }
  }
  // mapを配列にする
  const categoryArray = Array.from(categoryMinutes, ([name, time]) => ({ name, time }));


  return (
    <div className="todayRecordContainer">
      <div className="todayRecordHeader">
        <h3>今日の記録</h3>
        {totalMinutes > 0 ?(
          <p>{toHoursMinutes(totalMinutes)}</p>
        ) : (
          <p>記録がありません</p>
        )}
      </div>

      <div className="todayRecordProgressBar">
        {categoryArray.map((r, i) => {
          const percent = ((r.time / totalMinutes) * 100).toFixed(0) + "%";
          const color = colors[i % colors.length];
          return (
            <div
              key={r.name}
              style={{ width: percent, backgroundColor: color }}
            >
              {percent}
            </div>
          );
        })}
      </div>

      <div className="todayRecordLegend">
        {categoryArray.map((r, i) => {
          const color = colors[i % colors.length];
          return (
            <div key={r.name}>
              <span className="dot" style={{ backgroundColor: color }}></span>{" "}
              {r.name}
            </div>
          );
        })}
      </div>

      <p className="todayRecordDate">{today}</p>
    </div>
  );
}
