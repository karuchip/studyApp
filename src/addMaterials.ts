import {supabase} from "@/lib/supabase"
import { Material } from "@/lib/type/material"

export const addMaterial = async (
  userId: string,
  name: string,
  categoryId: number | null
):Promise<Material | null> => {
  const {data, error} = await supabase
    .from("material")
    .insert([
      {
        user_id: userId,
        name: name,
        category_id: categoryId,
        is_deleted: false,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error adding material:", error);
    return null;
  } else {
    alert("教材を追加しました。")
  }

  return data as Material;

}
