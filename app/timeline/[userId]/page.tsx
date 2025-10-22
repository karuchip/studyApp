"use client";

import SelectMenu from "@/app/components/tool/menu";
import { supabase } from "../../../lib/supabase"
import dayjs from "dayjs";
import FeelingIcons from "@/app/components/feelingIcons";
import { useAuthContext } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteRecord } from "@/src/deleteRecord";
import Loading from "@/app/components/tool/loading";

type Record = {
  id: number;
  created_at: string;
  time: number;
  feeling: number;
  comment?: string;
  material: { name: string };
  user: {
    id: string;
    name: string
  };
};

export default function Home() {
  const { loginUser } = useAuthContext();
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

    // タイムラインレコード取得
    const fetchRecords = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("record")
        .select(`
          *,
          material:material_id (name),
          "user":user_id (name, id)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        setError(error);
        setLoading(false);
      } else {
        setRecords(data || []);
        setLoading(false);
      }
    };

  // 画面開いた時にレコード取得
  useEffect(() => {
    fetchRecords();
  }, []);


  // レコード削除
  const handleDeleteRecord = async(recordId:number, userId:string, material:string, hour:number, min:number, date:string) => {
    if(loginUser && loginUser.id === userId) {

      const ok = window.confirm(`${date}の記録: ${material}(${hour}時間${min}分)を削除してよろしいですか？`);
      if(!ok) return;

      await deleteRecord(recordId);
      fetchRecords();

      alert("記録を削除しました。")
    }
  }

  if (error) {
    console.error(error);
    return <div>エラーが発生しました</div>;
  }

  if(!loginUser) {
    return <p>ログインしてください</p>
  }

  if(loading) {
    return<Loading/>
  }

  if(records.length === 0) {
    return <p>記録がありません</p>
  }

  return (
    <>
      <p className="co-pageTitle">Feed</p>
      <SelectMenu userId={loginUser?.id} />
      <div className="timelineContainer">
        <ul>
          {records?.map((r) => {
            const formattedDate = dayjs(r.created_at).format("YYYY年MM月DD日HH:mm");
            const studyHour = Math.floor(r.time / 60);
            const studyMin = r.time % 60;

            return (
              <div key={r.id} className="timelineContent">
                <div className="timelineUserDate">
                  <p className="timelineDate">{formattedDate}</p>
                </div>
                <div className="timelineMaterialTime">
                  <p className="timelineMaterial">{r.material.name}</p>
                  {studyHour === 0 ? (
                    <p className="timelineTime">{studyMin}分</p>
                  ) : (
                    <p className="timelineTime">{studyHour}時間 {studyMin}分</p>
                  )}
                </div>

                <div className="timelineFeelingComment">
                  <FeelingIcons index={String(r.feeling)} />
                  {r.comment && (
                    <>
                      <span className="timelineCommentRound1"></span>
                      <span className="timelineCommentRound2"></span>
                      <p className="timelineComment">{r.comment}</p>
                    </>
                  )}
                </div>

                <div className="timelineRecordDelete">
                  <p className="timelineUser">{r.user.name}の記録</p>
                  <button onClick={()=>handleDeleteRecord(r.id, r.user.id, r.material.name, studyHour, studyMin, formattedDate)} className="co-deleteBtn">
                    <DeleteIcon sx={{fontSize:"20px"}}/>
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
