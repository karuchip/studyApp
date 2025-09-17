export type Record = {
  id: string;
  created_at: string;
  time: number;
  feeling: number;
  comment?: string;
  material: {
    name: string;
    category: {
      name: string
    }
  };
  user: { name: string };
};
