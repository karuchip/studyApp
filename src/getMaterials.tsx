import { supabase } from "@/lib/supabase"
import { Material } from "@/lib/type/material"

type MaterialWithCategory = Material & {
  category: { name: string } | null;
};

export const getMaterials = async (
  userId: string
): Promise<MaterialWithCategory[]> => {
  const { data: materials, error } = await supabase
    .from("material")
    .select(`
      *,
      category:category_id (name)
    `)
    .eq("user_id", userId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return materials as MaterialWithCategory[];
};
