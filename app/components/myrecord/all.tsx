"use client"

import { getMyAllRecord } from "@/src/getMyAllRecord";
import { useEffect, useState } from "react";
import { Record } from "@/lib/type/record";
import { useAuthContext } from "@/context/AuthContext";
import Loading from "../tool/loading";

export default function AllRecordCard() {
  const [records, setRecords] = useState<Record[]>([]);
  const [totalHour, setTotalHour] = useState<number>(0);
  const [totalMin, setTotalMin] = useState<number>(0);
  const {loginUser} = useAuthContext();
  const [loading, setLoading] = useState(false);

  // 人参カウント
  const [ninjinCount, setNinjinCount] = useState(0);
  const [usagiSize, setUsagiSize] = useState(0);

  // 全ての記録情報を取得
  useEffect(() => {
    setLoading(true);
    const getMyToday = async () => {
      try {
        if(!loginUser?.id) return null;
        const result = await getMyAllRecord(loginUser.id);
        setRecords(result);

        // 総学習時間を計算
        const total = result.reduce(
          (sum: number, record: Record) => sum + (record.time || 0),
          0
        );
        setTotalHour(Math.floor(total / 60));
        setTotalMin((total % 60));

        // 人参カウント
        setNinjinCount(Math.floor(Math.floor(total / 60) / 5 ));
        setUsagiSize(Math.floor(Math.floor(total / 60) / 5 ) + 12)

        setLoading(false);

      } catch (error) {
        console.error("データ取得エラー:", error);
        setLoading(false);
      }
    };
    getMyToday();
  }, []);

  if(loading) {
    return<Loading/>
  }

  return (
    <div className="totalStudyHourContainer">
      <div className="totalStudyHour">
        <h2 className="MyPageTitle">総学習時間</h2>
        <p className="MyPageTime"> {totalHour} 時間 {totalMin} 分</p>
      </div>

      {/* 人参うさぎ */}
      <div className="totalNinjinContainer">
        <p
          style={{
            fontSize:usagiSize,
            marginRight: "10px",
          }}
        >🐰</p>
        {Array.from({length: ninjinCount}).map((_, i) => (
          <p key={i}>🥕</p>

        ))}
      </div>
    </div>
  );
}
