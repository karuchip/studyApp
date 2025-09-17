import { useState } from "react"

type Category = {
  id: number
  name: string
}

type Props = {
  categories: Category[]
  onSubmit: (name: string, categoryId: number | null, newCategoryName?: string) => void
}

export const AddMyMaterial = ({ categories, onSubmit }: Props) => {
  const [name, setName] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  const handleSubmit = () => {
    if (isAddingCategory) {
      onSubmit(name, null, newCategoryName)
    } else {
      onSubmit(name, selectedCategoryId, undefined)
    }

    // フォームをリセット
    setName("")
    setSelectedCategoryId(null)
    setNewCategoryName("")
    setIsAddingCategory(false)
  }

  return (
    <div className="addMaterialContent">
      <h2>新しい教材を追加する</h2>

      <p>🐻 教材名</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>🧸 カテゴリー</p>
      {!isAddingCategory ? (
        <>
          <select
            value={selectedCategoryId ?? ""}
            onChange={(e) =>
              setSelectedCategoryId(
                e.target.value ? Number(e.target.value) : null
              )
            }
          >
            <option value="">選択してください</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button className="addMaterialCategoryChange" type="button" onClick={() => {
            setIsAddingCategory(true)
            setSelectedCategoryId(null) // 🔑 選択をリセット
          }}>
            新しくカテゴリを追加する
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="新しいカテゴリ名"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button type="button" className="addMaterialCategoryChange" onClick={() => {
            setIsAddingCategory(false)
            setNewCategoryName("") // 🔑 入力をリセット
          }}>
            既存のカテゴリを選ぶ
          </button>
        </>
      )}

      <br />
      <button type="button" onClick={handleSubmit} className="addMaterialBtn">
        教材登録
      </button>
    </div>
  )
}
