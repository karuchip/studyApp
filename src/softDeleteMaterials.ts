import {supabase} from "@/lib/supabase"

export const softDeleteMaterial = async (id: number | string) => {
  console.log("削除する material id は:", id, "型:", typeof id);

  const { data, error } = await supabase
    .from("material")
    .update({ is_deleted: true })
    .eq("id", id.toString()) // ← 文字列で渡す
    .select();

  if (error) {
    console.error("Error soft deleting material:", error);
    return false;
  }

  console.log("Updated material:", data);
  return true;
};
