import { format } from "date-fns";

type DaySummary = {
  month: number;
  date: number;
  weekName: string;
  totalMinutes: number;
};

type StudyCalendarProps = {
  days: DaySummary[];
};

export const StudyCalendar = ({ days }: StudyCalendarProps) => {
  if (!days || days.length === 0) return <p>データがありません</p>;

  const emoji = ["🐶", "🐱", "🐹", "🐰", "🐻‍❄️", "🦊", "🐨", "🐼", "🦁", "🐯", "🐻‍❄️", "🐣", "🦄" ]
  const randomIndex = Math.floor(Math.random() * (emoji.length-1));

  // その月の最初の日を取得
  const firstDay = new Date(2025, days[0].month - 1, 1);
  const firstDayOfWeek = firstDay.getDay(); // 0(日)〜6(土)


  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-2xl p-4 mt-8 border border-[#ddd]">
      <h2 className="text-xl font-bold text-center">
        {format(firstDay, "yyyy年MM月")}
      </h2>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 text-center font-semibold mb-3 mt-3">
        {["日", "月", "火", "水", "木", "金", "土"].map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      {/* カレンダー本体 */}
      <div className="grid grid-cols-7 gap-0 text-center">
        {/* 月初の空白セルを挿入 */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-16" />
        ))}

        {/* 各日をマスに表示 */}
        {days.map((d) => (
          <div
            key={d.date}
            className="h-16 flex flex-col justify-center items-center outline outline-[#EEEEEE] border border-[#ddd] "
          >
            <span className="text-sm font-bold">{d.date}</span>
              {d.totalMinutes>0 ? (
                <span className="text-xs text-[#FE637B] font-bold">
                  <span>{emoji[randomIndex]}</span><br/>

                  {Math.floor(d.totalMinutes/60) > 0 && (
                    <span>
                      {Math.floor(d.totalMinutes/60)}<span className="text-xs">h</span>
                    </span>
                  )}
                  {d.totalMinutes%60}<span className="text-xs">m</span>
                </span>
              ):(
                <span className="text-xs text-violet-500 h-8"></span>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};
