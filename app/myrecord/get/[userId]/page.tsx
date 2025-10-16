"use client";

import SelectMenu from "@/app/components/tool/menu";
// import { supabase } from "../../../../lib/supabase"
import AllRecordCard from "@/app/components/myrecord/all";
import LastOneWeekRecordCard from "@/app/components/myrecord/lastOneWeek";
// import { useEffect, useState } from "react";
import TodayRecordCard from "@/app/components/myrecord/today";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function GetMyRecord() {
  const { loginUser } = useAuthContext();

  if(!loginUser) {
    return<p>ログインしてください。</p>
  }

  return (
    <main className="p-4 myPageContainer">
      {/* メニュー */}
      <SelectMenu userId={loginUser.id} />

      <p className="co-pageTitle">私の記録</p>

      {/* 今日の記録 */}
      <TodayRecordCard/>

      {/* 過去1週間の記録 */}
      <LastOneWeekRecordCard/>

      {/* 過去1ヶ月の記録 */}
      <Link href={`/myrecord/monthlyRecord/${loginUser.id}`}>

        <div
          style={{
            width:"310px",
            margin: "10px auto 20px auto",
            padding: "20px",
            border: "1px solid #fbc8c8ff",
            borderRadius: "5px"
          }}
        >
          <p>月の記録</p>
        </div>
      </Link>

      {/* 総学習時間 */}
      <AllRecordCard />

    </main>
  );
}
