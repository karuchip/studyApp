"use client"

import SelectMenu from "@/app/components/menu";
import MyMaterials from "@/app/components/myMaterial";
import { useAuthContext } from "@/context/AuthContext";

export default function GetMyRecord() {
  const { loginUser } = useAuthContext();

  if(!loginUser) {
    return<p>ログインしてください。</p>
  }

  return (
    <main className="p-4">
      {/* メニュー */}
      <SelectMenu userId={loginUser.id} />


      {/* 教材編集 */}
      <MyMaterials userId={loginUser.id} />
    </main>
  );
}
