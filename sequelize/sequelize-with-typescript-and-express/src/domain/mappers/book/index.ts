import { PublicBookDto, PublicUserAllBooksDto, PublicUserBookDto } from "src/domain/dtos/book";

export class BookMapper {
  static toPublicDto(data: any): PublicBookDto {
    return {
      user_id: data.user_id,
      id: data.id,
      title: data.title,
      author: data.author,
      released: data.released,
      pages_total: data.pages_total,
      image_name: data.image_name,
      likes: data.likes,
      dislikes: data.dislikes,
    }
  }

  static toPublicUserDto(data: any): PublicUserBookDto {
    return {
      avatar: data.avatar,
      name: data.name,
      books: data.books,
    }
  }

  static toPublicUserAllBooksDto(data: any): PublicUserAllBooksDto {
    return {
      avatar: data.avatar,
      name: data.name,
      total: data.total,
      books: data.books,
    }
  }
}