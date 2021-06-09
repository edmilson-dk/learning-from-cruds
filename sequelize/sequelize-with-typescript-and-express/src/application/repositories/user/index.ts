import { AddUserDto, StoredUserDto } from "src/dtos/user";

export interface IUserRepository {
  addUser: (data: AddUserDto) => Promise<void>;
  findUser: (userId: string) => Promise<StoredUserDto | null>;
}