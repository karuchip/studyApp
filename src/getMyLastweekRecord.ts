import { supabase } from "@/lib/supabase"
import { Record } from "@/lib/type/record";

export const getMyTodayRecord = async (
  userId: string
): Promise<Record[]> => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);

  const { data, error } = await supabase
    .from("record")
      .select(`
        *,
        material:material_id (
          name,
          category:category_id(
            name
          )
        ),
        user:user_id (name)
      `)
      .eq("user_id", userId) // ユーザーごとの絞り込み
      .gte("created_at", sevenDaysAgo.toISOString()) // 7日前以降のデータ
      .lte("created_at", today.toISOString())        // 今日まで
      .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Record[]; // Always return a value of type Record[]
};
