"use client"
import { Material } from "@/lib/type/material";
import { getMaterials } from "@/src/getMaterials";
import { useCallback, useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { softDeleteMaterial } from "@/src/softDeleteMaterials";
import { addCategory } from "@/src/addCategory";
import { addMaterial } from "@/src/addMaterials";
import { AddMyMaterial } from "./addmyMaterial";
import { Category } from "@/lib/type/category";
import { getCategories } from "@/src/getCategory";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Loading from "./tool/loading";


type Props = {
  userId: string
}
const MyMaterials = ({userId}:Props) => {

  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Tab state
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


// 教材とカテゴリを取得する関数をまとめて作る
const fetchData = useCallback(async () => {
  if (userId === null) return;
  const materialsData = await getMaterials(userId);
  setMaterials(materialsData);

  const categoriesData = await getCategories(userId);
  setCategories(categoriesData);
},[userId]);

// useEffect で初回読み込み
useEffect(() => {
  fetchData();
}, [fetchData]);

// 教材削除
const handleDeleteMaterial = async (id: number, name: string) => {
  const ok = window.confirm(`${name}を削除してよろしいですか？`);
  if(!ok) return;

  const result = await softDeleteMaterial(id);
  if (result) {
    alert(`${name}を削除しました。`);
    // 削除成功後に再取得
    fetchData();
  } else {
    alert(`${name}の削除に失敗しました。`);
  }
};

// 教材追加
const handleAddMaterial = async (
  name: string,
  categoryId: number | null,
  newCategoryName?: string
) => {
  let finalCategoryId = categoryId;

  // 新しいカテゴリ名が入力されていたら、カテゴリを作成してそのidを使う
  if (!categoryId && newCategoryName) {
    const category = await addCategory(userId, newCategoryName);
    if (category) {
      finalCategoryId = category.id;
    }
  }

  // 教材追加関数の呼び出す
  await addMaterial(userId, name, finalCategoryId);
  fetchData();
};


  // 画面表示
  if(materials.length === 0) {
    return <Loading/>
  }

  return (
    <>

      <div className="materialIndexContainer">

        <p className="co-pageTitle">Material</p>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
              <Tab label="教材リスト" value="1" />
              <Tab label="追加する" value="2" />
            </TabList>
          </Box>


          <TabPanel value="1">
            {
              Object.entries(
                materials.reduce((acc, m) => {
                  const categoryName = m.category?.name ?? "未分類";
                  if (!acc[categoryName]) acc[categoryName] = [];
                  acc[categoryName].push(m);
                  return acc;
                }, {} as Record<string, typeof materials>)
              ).map(([category, mats]) => (
                <div key={category} className="materialIndexCategory">
                  <h4>🐶 {category}</h4>
                  {(mats as Material[]).map((m) => (
                    <div key={m.id} className="materialIndexNameDelete">
                      <p>・ {m.name}</p>
                      <button onClick={()=>handleDeleteMaterial(m.id, m.name)} className="co-deleteBtn">
                        <DeleteIcon sx={{fontSize:"20px"}}/>
                      </button>
                    </div>
                  ))}
                </div>
              ))
            }
          </TabPanel>


          <TabPanel value="2">
            {/* 教材追加 */}
            <AddMyMaterial categories={categories} onSubmit={handleAddMaterial}/>
          </TabPanel>


        </TabContext>
      </div>
    </>
  )
}

export default MyMaterials
