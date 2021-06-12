import { AddUserDto, StoredUserDto } from "src/domain/dtos/user";

export interface IUserUseCases {
  addUser: (data: AddUserDto) => Promise<void>;
  findUser: (userId: string) => Promise<StoredUserDto | null>;
}