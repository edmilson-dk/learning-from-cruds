import { IUserRepository } from "src/application/repositories/user";
import { IUserUseCases } from "src/domain/use-cases/user";
import { AddUserDto, PublicUserDto, StoredUserDto } from "src/domain/dtos/user";
import { isValidHash } from "src/infra/security/bcrypt";
import { UserMapper } from "src/domain/mappers/user";

export class UserServices implements IUserUseCases {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  } 
 
  async addUser({ name, password, avatar, email, bio }: AddUserDto) {
    const existsUser = await this.userRepository.getUser(email);

    if (existsUser) {
      throw new Error("User alredy exists");
    }

    const data = await this.userRepository.addUser({ name, password, avatar, email, bio });
    return data;
  }

  async getUser(email: string, password: string): Promise<PublicUserDto | null> {
    const userOrNull = await this.userRepository.getUser(email);

    if (!userOrNull) return null;

    if (!(await isValidHash(password, userOrNull.password))){
      throw new Error("Invalid user password");
    }

    return UserMapper.toPublicDto(userOrNull);
  }
}