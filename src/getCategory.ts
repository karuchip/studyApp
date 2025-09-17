import { supabase } from "@/lib/supabase"
import { Category } from "@/lib/type/category";



export const getCategories = async (
  userId: string
): Promise<Category[]> => {
  const { data: materials, error } = await supabase
    .from("category")
    .select(`
      *
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return materials as Category[];
};
