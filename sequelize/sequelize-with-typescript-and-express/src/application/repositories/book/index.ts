import { AddBookDto, PublicBookDto, PublicUserBookDto } from "src/domain/dtos/book";

export interface IBookRepository {
  addBook: (data: AddBookDto) => Promise<PublicBookDto>;
  getOneBook: (userId: string, bookId: string) => Promise<PublicUserBookDto>;
  getAllBooks: (userId: string) => Promise<PublicUserBookDto>;
}