import { AddUserDto, StoredUserDto } from "src/dtos/user";

export interface IUserUseCases {
  addUser: (data: AddUserDto) => Promise<void>;
  findUser: (userId: string) => Promise<StoredUserDto | []>;
}