import { IBookRepository } from "src/application/repositories/book";
import { constants } from "src/constants";
import { AddBookDto, PublicBookDto, PublicUserAllBooksDto, PublicUserBookDto, UpdateBookDto } from "src/domain/dtos/book";
import { BookMapper } from "src/domain/mappers/book";

import { Book } from "src/models/book";
import { User } from "src/models/user";

export class BookSequelizePgRepository implements IBookRepository {
  private readonly bookAttributes = [
    "title", "author", "released", 
    "pages_total", "image_name", "likes", 
    "dislikes", "id", "user_id"
  ];

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
        attributes: this.bookAttributes,
      }]
    });

    return BookMapper.toPublicUserDto(row);
  }

  async getAllBooks(userId: string, page: number): Promise<PublicUserAllBooksDto> {
    const count = await Book.count({
      where: { user_id: userId },
    });

    const row = await User.findOne({
      where: { id: userId },
      attributes: ["avatar", "name"],
    });

    const books = await Book.findAll({
      where: { user_id: userId },
      offset: (page -1) * constants.booksDataLimit,
      limit: constants.booksDataLimit,
      attributes: this.bookAttributes,
    });

    const booksData = books.map(book => book.get());
    const data = {...row?.get(), books: booksData };

    return BookMapper.toPublicUserAllBooksDto({ total: count, ...data });
  }

  async updateBook(userId: string, bookId: string, data: UpdateBookDto): Promise<boolean> {
    const updated = await Book.findOne({
      where: { user_id: userId, id: bookId },
    });

    if (updated) {
      updated.update(data);
      return true;
    }

    return false;
  }

  async deleteBook(userId: string, bookId: string) {
    const book = await Book.findOne({
      where: { user_id: userId, id: bookId },
    });

    if (book) {
      const { image_name } = book.get();
      await book.destroy();

      return image_name;
    }

    return null;
  }
 }