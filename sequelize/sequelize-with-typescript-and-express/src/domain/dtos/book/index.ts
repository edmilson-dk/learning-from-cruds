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

export type PublicBookDto = {
  title: string;
  author: string;
  released: string;
  pages_total: number;
  image_name: string;
  likes: number;
  dislikes: number;
  user_id: string;
  id: string;
}

export type PublicUserBookDto = {
  avatar: string;
  name: string;
  books: PublicBookDto[],
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