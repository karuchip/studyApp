"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useAuthContext } from "@/context/AuthContext"
import Loading from "@/app/components/tool/loading";

export default function Login() {
  const [input, setInput] = useState<string>("")
  const router = useRouter()
  const { setLoginUser, setSession } = useAuthContext()
  const [loading, setLoading] = useState(false)

  const handleClick = (num: number) => {
    setInput((prev) => prev + num.toString())
  }

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "study@study.com",
      password: input,
    })

    if (error || !data.user) {
      alert("ログイン失敗: " + error?.message)
      setInput("");
      setLoading(false);
      return
    }

    // ✅ DB上のユーザー情報を取得
    const { data: dbUser, error: dbError } = await supabase
      .from("user")
      .select("*")
      .eq("id", data.user.id) // Auth ID と同じ値
      .single()

    if (dbError || !dbUser) {
      alert("DB 上のユーザー取得に失敗しました")
      console.error(dbError)
      setLoading(false);
      return
    }

    alert("ログイン成功！")
    setLoginUser(dbUser)
    setSession(data.session)
    setLoading(false);

    router.push(`/timeline/${dbUser.id}`)
  }

  if(loading) {
    return<Loading/>
  }

  return (
    <div className="loginContainer">
      <h1>Study App</h1>
      <div className="loginContent">
        {[0,1,2,3,4,5,6,7,8,9].map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            className="loginNum"
          >
            {num}
          </button>
        ))}
      </div>
      <button
        onClick={handleLogin}
        className="loginBtn"
      >
        ログイン
      </button>
    </div>
  )
}
