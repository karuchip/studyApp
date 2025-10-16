"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMaterials } from "@/src/getMaterials";
import { Material } from "@/lib/type/material";
import SelectMenu from "@/app/components/tool/menu";

// MUI
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import Loading from "@/app/components/tool/loading";

export default function AddRecordPage({ params }: { params: Promise<{ userId: string }> }) {

  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialId, setMaterialId] = useState(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [feeling, setFeeling] = useState<string>("")
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // MUIアイコン配列
  const muiIcons = [TagFacesIcon, SentimentSatisfiedAltIcon, SentimentSatisfiedIcon, SentimentDissatisfiedIcon, MoodBadIcon]
  // アイコンの色
  const color = ["#FF6347", "#FFA500", "#FFD700", "#90EE90", "#87CEFA" ];

  // paramsをアンラップしてuserIdを取得
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.userId);
    };
    getParams();
  }, [params]);

  // userIdが取得できたら教材を取得
  useEffect(() => {


    if (userId === null) return;
    const loadMaterials = async () => {
      setLoading(true);
      const data = await getMaterials(userId);
      setMaterials(data);
      setLoading(false);
    };
    loadMaterials();
  }, [userId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const totalTime = hours * 60 + minutes;

    const { data, error } = await supabase.from("record").insert([
      {
        user_id: userId,
        material_id: materialId,
        time: totalTime,
        feeling,
        comment,
      },
    ]);


    if (error) {
      console.error(error);
      alert("登録に失敗しました: " + error.message);
      setLoading(false);
    } else {
      console.log(data);
      alert("記録を登録しました！");
      router.push(`/myrecord/get/${userId}`); // 一覧画面に戻すイメージ
      setLoading(false);
    }
  };
  if(loading) {
    return<Loading/>
  }

  return (
    <>
      {/* メニュー */}
      {userId && (
        <SelectMenu userId={String(userId)}/>
      )}

      {/* 記録追加 */}
      <div className="addContainer">
        <p className="co-pageTitle">記録する</p>


        <form onSubmit={handleSubmit} className="addRecordContent">

          {/* 教材ID入力*/}
          <div className="addRecordItems">
            <h3>教材</h3>

            {Object.entries(
              materials.reduce((acc, m) => {
              const categoryName = m.category?.name ?? "未分類";
              if (!acc[categoryName]) acc[categoryName] = [];
              acc[categoryName].push(m);
              return acc;
            }, {} as Record<string, typeof materials>)
            ).map(([category, mats]) => (
              <div  className="addRecordCategory" key={category}>
                <h4>🐰 {category}</h4>
                {mats.map((m) => (
                  <div key={m.id} className="addMaterial">
                    <label className="addMaterialName">
                      <input
                        type="radio"
                        name="material"
                        value={m.id}
                        checked={materialId === m.id}
                        onChange={(e) => setMaterialId(Number(e.target.value))}
                        style={{display:"none"}}
                      />
                      <p
                        style={{
                          backgroundColor: materialId === m.id ? "#83aeff" : "#fff",
                          color: materialId === m.id ? "#fff" : "rgba(175, 175, 175, 1)",
                          borderRadius: "10px",
                          width: "fit-content",
                          padding: "3px 10px",
                          fontSize: "14px",
                          border: materialId === m.id ? "none" : "1px solid rgba(175, 175, 175, 1)" ,
                          margin: "5px 0 10px 0",
                          fontWeight: "bold",
                        }}
                      >{m.name}</p>
                    </label>
                  </div>
                ))}
              </div>
            ))}

          </div>

          {/* 勉強時間 */}
          <div className="addRecordItems">
            <h3>学習時間</h3>
            <input
              className="addRecordTime"
              type="number"
              placeholder="勉強時間(分)"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
            <span> 時間 </span>
            <input
              className="addRecordTime"
              type="number"
              placeholder="勉強時間(分)"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              />
              <span> 分</span>
          </div>


          {/* 気持ち */}
          <div className="addRecordItems">
            <h3>気持ち</h3>
            <div className="addRecordFeelingContent">
              {muiIcons.map((Icon, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="feeling"
                    value={index + 1}
                    onChange={(e) => setFeeling(e.target.value)}
                    style={{display:"none"}}
                  />
                    <Icon
                      sx={{
                        fontSize: String(index + 1) === feeling ? "55px" : "35px",
                        margin: "5px",
                        color: color[index],
                      }}
                    />
                </label>
              ))}
            </div>
          </div>


          {/* コメント */}
          <div className="addRecordItems">
            <h3>コメント</h3>
            <textarea
              className="addRecordComment"
              placeholder="コメントを入力してね"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="addRecordButton">
            <button
              type="submit"
            >
              追加
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
