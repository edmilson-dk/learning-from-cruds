export type AddUserDto = {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
}

export type PublicUserDto = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  id: string;
}

export interface StoredUserDto {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  id: string;
  created_at: string;
  updated_at: string;
}