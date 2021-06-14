import { AddUserDto, PublicUserDto, StoredUserDto } from "src/domain/dtos/user";

export interface IUserRepository {
  addUser: (data: AddUserDto) => Promise<PublicUserDto>;
  getUser: (email: string) => Promise<StoredUserDto | null>;
}