import { supabase } from "../lib/supabase"

export default async function Home() {
  const { data: records, error } = await supabase
    .from("record")
    .select("*")
    // .order("created_at", { ascending: false });

  if (error) {
    console.error(error)
    return <div>エラーが発生しました</div>
  }

  if (records) {
    return (
      <main className="p-4">
        <h1 className="text-xl font-bold mb-4">勉強記録</h1>
        <ul>
          {records?.map((r) => (
            <li key={r.id}>
              {r.material_id} - {r.time}分 - {r.created_at}
              {r.comment}
            </li>
          ))}
        </ul>
      </main>
    )

  }
}
