export type AddBookDto = {
  title: string;
  author: string;
  released: string;
  pages_total: number;
  image_name: string;
  likes: number;
  dislikes: number;
  user_id: string;
}

export type StoredBookDto = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  author: string;
  released: string;
  pages_total: number;
  image_name: string;
  likes: number;
  dislikes: number;
  user_id: string;
}