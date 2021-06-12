import { AddUserDto, PublicUserDto, StoredUserDto } from "src/domain/dtos/user";

export interface IUserRepository {
  addUser: (data: AddUserDto) => Promise<PublicUserDto>;
  findUser: (userId: string) => Promise<StoredUserDto | null>;
  findUserByEmail: (email: string) => Promise<StoredUserDto | null>;
}