import { AddUserDto, PublicUserDto, StoredUserDto } from "src/domain/dtos/user";

export interface IUserUseCases {
  addUser: (data: AddUserDto) => Promise<PublicUserDto>;
  getUser: (email: string, password: string) => Promise<StoredUserDto | null>;
}