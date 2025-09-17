export type Material = {
  id: number;
  created_at: Date;
  updated_at: Date | null;
  user_id: string;
  image: string;
  category_id: string;
  category?: {
    name?: string;
  };
  name: string;
  is_deleted: boolean;
}
