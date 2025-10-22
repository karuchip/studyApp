"use client";

import SelectMenu from "@/app/components/tool/menu";
// import { supabase } from "../../../../lib/supabase"
import AllRecordCard from "@/app/components/myrecord/all";
import LastOneWeekRecordCard from "@/app/components/myrecord/lastOneWeek";
// import { useEffect, useState } from "react";
import TodayRecordCard from "@/app/components/myrecord/today";
import { useAuthContext } from "@/context/AuthContext";

export default function GetMyRecord() {
  const { loginUser } = useAuthContext();

  if(!loginUser) {
    return<p>ログインしてください。</p>
  }

  return (
    <main className="myPageContainer">
      {/* メニュー */}
      <SelectMenu userId={loginUser.id} />

      <p className="co-pageTitle">My Records</p>

      {/* 今日の記録 */}
      <TodayRecordCard/>

      {/* 過去1週間の記録 */}
      <LastOneWeekRecordCard/>

      {/* 総学習時間 */}
      <AllRecordCard />

    </main>
  );
}
