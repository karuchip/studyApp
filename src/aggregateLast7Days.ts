import { format, subDays } from "date-fns";
import { Record } from "@/lib/type/record";


// 日ごとの集計結果の型
type DaySummary = {
  dateLabel: string;     // "09/01" みたいな表示用
  totalMinutes: number;  // 合計学習時間（分）
};

// records: Supabaseから取得したデータ
export function aggregateLast7Days(records: Record[]): DaySummary[] {
  const today = new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(today, 6 - i);
    const key = format(date, "yyyy-MM-dd");

    const dayRecords = records.filter(
      (r) => format(new Date(r.created_at), "yyyy-MM-dd") === key
    );

    const totalMinutes = dayRecords.reduce((sum, r) => sum + r.time, 0);

    return {
      dateLabel: format(date, "MM/dd"),
      totalMinutes,
    };
  });

  return last7Days;
}
