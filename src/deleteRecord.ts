import { supabase } from "@/lib/supabase"

export const deleteRecord = async (id: number) => {
  const { error } = await supabase
    .from("record")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting material:", error);
    return false;
  }

  return true;
};
