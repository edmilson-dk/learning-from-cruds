import { IBookRepository } from "src/application/repositories/book";
import { AddBookDto, PublicBookDto, PublicUserBookDto } from "src/domain/dtos/book";
import { BookMapper } from "src/domain/mappers/book";

import { Book } from "src/models/book";
import { User } from "src/models/user";

export class BookSequelizePgRepository implements IBookRepository {
  async addBook(data: AddBookDto): Promise<PublicBookDto> {
    const row = await Book.create(data);
    return BookMapper.toPublicDto(row.get());
  }

  async getOneBook(userId: string, bookId: string): Promise<PublicUserBookDto> {
    const row = await User.findOne({
      where: { id: userId },
      attributes: ["avatar", "name"],
      include: [{
        where: { id: bookId },
        association: "books",
        attributes: [
          "title", "author", "released", 
          "pages_total", "image_name", "likes", 
          "dislikes", "id", "user_id"
        ],
      }]
    });

    return BookMapper.toPublicUserDto(row);
  }
}