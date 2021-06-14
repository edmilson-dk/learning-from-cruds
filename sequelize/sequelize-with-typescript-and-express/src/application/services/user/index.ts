import { IUserRepository } from "src/application/repositories/user";
import { IUserUseCases } from "src/domain/use-cases/user";
import { AddUserDto, PublicUserDto } from "src/domain/dtos/user";
import { encryptData, isValidHash } from "src/infra/security/bcrypt";
import { UserMapper } from "src/domain/mappers/user";
import { isInvalidLoginUserData, isInvalidRegisterUserData } from "src/domain/validations/user";

export class UserServices implements IUserUseCases {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  } 
 
  async addUser({ name, password, avatar, email, bio }: AddUserDto) {
    const validateResult = isInvalidRegisterUserData({ bio, email, name, password });
      
    if (validateResult) {
      throw new Error(validateResult.message);
    }

    const existsUser = await this.userRepository.getUser(email);

    if (existsUser) {
      throw new Error("User alredy exists");
    }

    const hashedPassword = await encryptData(password, 10);

    const data = await this.userRepository.addUser({ 
      name, password: hashedPassword, 
      avatar, email, bio 
    });

    return data;
  }

  async getUser(email: string, password: string): Promise<PublicUserDto | null> {
    const validateResult = isInvalidLoginUserData({ email, password });

    if (validateResult) {
      throw new Error(validateResult.message);
    }

    const userOrNull = await this.userRepository.getUser(email);

    if (!userOrNull) return null;

    if (!(await isValidHash(password, userOrNull.password))){
      throw new Error("Invalid user password");
    }

    return UserMapper.toPublicDto(userOrNull);
  }
}