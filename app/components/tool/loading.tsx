"use client"

import Image from "next/image"

export default function Loading() {
  return(
    <div className="loadingContainer">
      <div className="loadingContent">
        <p>ちょっとまってね</p>
        <Image src="/image/panda.png" alt="パンダ画像" width={100} height={100}/>
        <p>あとすこし</p>
      </div>
    </div>
  )
}
