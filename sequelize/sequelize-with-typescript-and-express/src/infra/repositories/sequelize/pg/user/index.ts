import { IUserRepository } from "src/application/repositories/user";
import { AddUserDto, PublicUserDto, StoredUserDto } from "src/domain/dtos/user";
import { UserMapper } from "src/domain/mappers/user";
import { User } from "src/models/user";

export class UserSequelizePgRepository implements IUserRepository {
  async addUser(data: AddUserDto): Promise<PublicUserDto> {
    const row = await User.create(data);
    return UserMapper.toPublicDto(row.get());
  }

  async getUser(email: string): Promise<StoredUserDto | null> {
    const userOrNull = await User.findOne({
      where: { email: email },
    });

    if (!userOrNull) return null;

    const data = userOrNull.get();
    
    return data;
  }
}