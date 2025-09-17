import { supabase } from "@/lib/supabase";

export const addCategory = async (userId: string, name: string) => {
  const { data, error } = await supabase
    .from("category")
    .insert([{ user_id: userId, name }])
    .select()
    .single();

  if (error) {
    console.error("Error adding category:", error);
    return null;
  }

  return data;
};
