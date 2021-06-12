import { AddUserDto, PublicUserDto, StoredUserDto } from "src/domain/dtos/user";

export interface IUserUseCases {
  addUser: (data: AddUserDto) => Promise<PublicUserDto>;
  findUser: (userId: string) => Promise<StoredUserDto | null>;
}