import { supabase } from "@/lib/supabase"

type Record = {
  id: string;
  created_at: string;
  time: number;
  feeling: number;
  comment?: string;
  material: {
    name: string;
    category: {
      name: string;
    };
  };
  user: { name: string };
};

export const getMyTodayRecord = async (
  userId: string
): Promise<Record[]> => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

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
    .eq("user_id", userId)
    .gte("created_at", startOfToday.toISOString()) // 今日の 0:00 以降
    .lte("created_at", endOfToday.toISOString())   // 今日の 23:59:59 まで
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Record[];
};
