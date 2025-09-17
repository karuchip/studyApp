import { supabase } from "@/lib/supabase"
import { Record } from "@/lib/type/record";

export const getMyAllRecord = async (
  userId: string
): Promise<Record[]> => {
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
      .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Record[];
};
