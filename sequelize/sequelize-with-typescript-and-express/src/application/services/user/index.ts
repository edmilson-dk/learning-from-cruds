import { IUserRepository } from "src/application/repositories/user";
import { IUserUseCases } from "src/domain/use-cases/user";
import { AddUserDto, StoredUserDto } from "src/dtos/user";

export class UserServices implements IUserUseCases {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  } 
 
  async addUser({ name, password, avatar, email, bio }: AddUserDto) {
    const existsUser = await this.userRepository.findUserByEmail(email);

    if (existsUser) {
      throw new Error("User alredy exists");
    }

    await this.userRepository.addUser({ name, password, avatar, email, bio });
    return;
  }

  async findUser(userId: string): Promise<StoredUserDto | null> {
    const userOrNull = await this.userRepository.findUser(userId);

    if (!userOrNull) return null;

    return userOrNull;
  }
}