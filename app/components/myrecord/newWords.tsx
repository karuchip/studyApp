"use client"

import { useEffect, useState } from "react"

const NewWords = () => {

  const newWords = [
  ["abrupt", "突然の／不意の", "His abrupt decision surprised everyone.", "彼の突然の決断は皆を驚かせた。"],
  ["acquire", "習得する／得る", "She worked hard to acquire new skills.", "彼女は新しいスキルを身につけるため努力した。"],
  ["adequate", "十分な／適切な", "The hotel provided adequate facilities for guests.", "そのホテルは宿泊客に十分な設備を提供した。"],
  ["ambiguous", "曖昧な", "His answer was ambiguous and unclear.", "彼の答えは曖昧で明確ではなかった。"],
  ["anticipate", "予期する", "We anticipate heavy traffic during holidays.", "休日中は渋滞が起こると予想している。"],
  ["apparent", "明らかな／見かけ上の", "It became apparent that he was lying.", "彼が嘘をついていることは明らかになった。"],
  ["approximate", "おおよその／概算の", "This is only an approximate cost estimate.", "これはあくまで概算費用だ。"],
  ["consequence", "結果／影響", "Every action has a consequence.", "どんな行動にも結果がある。"],
  ["considerable", "かなりの／相当な", "She made a considerable contribution to the project.", "彼女はプロジェクトに大きく貢献した。"],
  ["contradict", "矛盾する／反対を主張する", "His actions contradict his words.", "彼の行動は発言と矛盾している。"],
  ["crucial", "極めて重要な", "Sleep is crucial for your health.", "睡眠は健康にとって非常に重要だ。"],
  ["decline", "減少する／断る", "The number of students has been declining.", "学生数は減少している。"],
  ["derive", "由来する／引き出す", "The word derives from Latin.", "その単語はラテン語に由来している。"],
  ["diverse", "多様な", "Japan has diverse regional cultures.", "日本には多様な地域文化がある。"],
  ["emerge", "現れる／明らかになる", "New problems emerged during the test.", "テスト中に新たな問題が発生した。"],
  ["emphasize", "強調する", "He emphasized the importance of teamwork.", "彼はチームワークの重要性を強調した。"],
  ["encounter", "直面する／出会う", "We encountered difficulties along the way.", "道中で困難に直面した。"],
  ["enhance", "高める／強化する", "This new feature enhances user experience.", "この新機能はユーザー体験を向上させる。"],
  ["equivalent", "同等の", "One euro is not equivalent to one dollar.", "1ユーロは1ドルと同等ではない。"],
  ["excessive", "過度の／極端な", "Excessive sugar intake is harmful.", "砂糖の過剰摂取は有害だ。"],
  ["feasible", "実現可能な", "Your idea is feasible with enough resources.", "十分な資源があればあなたの案は実現可能だ。"],
  ["fluctuate", "変動する", "The price of oil fluctuates daily.", "石油の価格は日々変動する。"],
  ["fundamental", "基本的な／根本的な", "Language is a fundamental tool for communication.", "言語はコミュニケーションの基本的な手段だ。"],
  ["generate", "生み出す／発生させる", "The project will generate new jobs.", "そのプロジェクトは新しい雇用を生み出すだろう。"],
  ["hypothesis", "仮説", "We tested the hypothesis through experiments.", "私たちは実験でその仮説を検証した。"],
  ["implement", "実行する／導入する", "The company implemented a new policy.", "その会社は新しい方針を導入した。"],
  ["inevitable", "避けられない", "Change is inevitable in life.", "人生に変化は避けられない。"],
  ["interpret", "解釈する", "How do you interpret his message?", "彼のメッセージをどう解釈しますか？"],
  ["justify", "正当化する", "Nothing can justify bullying.", "いじめは何によっても正当化できない。"],
  ["moderate", "適度な／中くらいの", "Regular exercise in moderate amounts is healthy.", "適度な運動習慣は健康によい。"],
  ["notable","注目すべき","She made notable progress in her research.","彼女は研究で注目すべき進歩を遂げた。"],
  ["obtain","取得する／得る","You need a permit to obtain the document.","その書類を得るには許可証が必要だ。"],
  ["obvious","明らかな","It was obvious that he was nervous.","彼が緊張しているのは明らかだった。"],
  ["overflow","あふれる","The river overflowed after the heavy rain.","大雨の後、川はあふれた。"],
  ["participate","参加する","Many students participated in the event.","多くの学生がそのイベントに参加した。"],
  ["pursue","追求する／続ける","She decided to pursue her dream of becoming a doctor.","彼女は医師になる夢を追求することに決めた。"],
  ["rational","理性的な／合理的な","Please make a rational decision.","合理的な判断をしてください。"],
  ["reveal","明らかにする","The report revealed the truth about the incident.","その報告書は事件の真相を明らかにした。"],
  ["reliable","信頼できる","He is a reliable team member.","彼は頼れるチームメンバーだ。"],
  ["retain","保持する","It's important to retain what you learn.","学んだことを保持するのは重要だ。"],
  ["significant","重要な／意味のある","This discovery is significant in science.","この発見は科学にとって重要だ。"],
  ["sophisticated","洗練された、高度な","They developed a sophisticated system.","彼らは高度なシステムを開発した。"],
  ["specify","明記する","Please specify your preferred date.","希望日時を明記してください。"],
  ["stable","安定した","The economy remains stable.","経済は安定している。"],
  ["substantial","かなりの／重要な","We received substantial support from the community.","地域から大きな支援を受けた。"],
  ["sufficient","十分な","We have sufficient evidence to prove it.","それを証明する十分な証拠がある。"],
  ["suppress","抑える","He tried to suppress his anger.","彼は怒りを抑えようとした。"],
  ["sustain","持続させる","We must sustain this effort for the future.","この努力を未来のために続けなければならない。"],
  ["tend","〜する傾向がある","People tend to forget small details.","人々は小さなことを忘れがちだ。"],
  ["transform","変化させる","Digital tools transform education.","デジタルツールは教育を変革している。"],
  ["transparent","透明な／率直な","We need a transparent decision-making process.","透明性のある意思決定プロセスが必要だ。"],
  ["trigger","引き起こす","Stress can trigger headaches.","ストレスは頭痛を引き起こすことがある。"],
  ["ultimately","最終的に","He ultimately chose to study abroad.","彼は最終的に留学を選んだ。"],
  ["unique","唯一の／独特な","Her ideas are always unique and creative.","彼女のアイデアはいつも独創的だ。"],
  ["verify","確認する／検証する","Scientists must verify the results.","科学者は結果を検証しなければならない。"],
  ["violate","違反する","You must not violate the rules.","規則に違反してはいけない。"],
  ["vulnerable","傷つきやすい／脆弱な","Children are more vulnerable to illness.","子供は病気にかかりやすい。"],
  ["withdraw","撤退する／引き出す","He decided to withdraw from the competition.","彼は大会から撤退することを決めた。"],
  ["witness","目撃する／証人","Many people witnessed the accident.","多くの人が事故を目撃した。"],
  ["yield","生み出す／屈する","The project yielded excellent results.","そのプロジェクトは素晴らしい結果を生んだ。"]
]

  const [index, setIndex] = useState<string[] | null>(null);

  useEffect(() => {
    const i = Math.floor(Math.random() * newWords.length);
    setIndex(newWords[i]);
  }, [])

  if (index) {
    return(
      <div className="newWordsContainer">
        <div className="newWordsTitle">
          <p className="one">{index[0]}</p>
          <p className="two">{index[1]}</p>
        </div>
        <div className="newWordsExample">
          <p>{index[2]}</p>
          <p>{index[3]}</p>
        </div>
      </div>
    )
  }
}

export default NewWords
