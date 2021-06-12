import { PublicUserDto } from "src/domain/dtos/user";

export class UserMapper {
  static toPublicDto(data: any): PublicUserDto {
    return {
      name: data.name,
      email: data.email,
      bio: data.bio,
      id: data.id,
      avatar: data.avatar
    }
  }
}