import { IUserRepository } from "src/application/repositories/user";
import { AddUserDto, StoredUserDto } from "src/dtos/user";
import { User } from "src/models/user";

export class UserSequelizePgRepository implements IUserRepository {
  async addUser(data: AddUserDto): Promise<void> {
    await User.create(data);
  }

  async findUser(userId: string): Promise<StoredUserDto | null> {
    const userOrNull = await User.findOne({
      where: { id: userId },
    });

    if (!userOrNull) return null;
    
    const data = userOrNull.get();

    return data;
  }

  async findUserByEmail(email: string): Promise<StoredUserDto | null> {
    const userOrNull = await User.findOne({
      where: { email: email },
    });

    if (!userOrNull) return null;

    const data = userOrNull.get();
    
    return data;
  }
}