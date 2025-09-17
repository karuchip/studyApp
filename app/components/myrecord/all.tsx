"use client"

import { getMyAllRecord } from "@/src/getMyAllRecord";
import { useEffect, useState } from "react";
import { Record } from "@/lib/type/record";
import { useAuthContext } from "@/context/AuthContext";

export default function AllRecordCard() {
  const [records, setRecords] = useState<Record[]>([]);
  const [totalHour, setTotalHour] = useState<number>(0);
  const [totalMin, setTotalMin] = useState<number>(0);
  const {loginUser} = useAuthContext();

  // 全ての記録情報を取得
  useEffect(() => {
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
        setTotalHour(Math.floor(total / 60))
        setTotalMin((total % 60))

      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    };
    getMyToday();
  }, []);

  return (
    <div className="totalStudyHour">
      <h2 className="MyPageTitle">総学習時間</h2>
      <p className="MyPageTime"> {totalHour} 時間 {totalMin} 分</p>
    </div>
  );
}
