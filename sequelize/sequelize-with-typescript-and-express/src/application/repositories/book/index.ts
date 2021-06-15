import { AddBookDto, PublicBookDto, PublicUserBookDto, UpdateBookDto } from "src/domain/dtos/book";

export interface IBookRepository {
  addBook: (data: AddBookDto) => Promise<PublicBookDto>;
  getOneBook: (userId: string, bookId: string) => Promise<PublicUserBookDto>;
  getAllBooks: (userId: string) => Promise<PublicUserBookDto>;
  deleteBook: (userId: string, bookId: string) => Promise<boolean>;
  updateBook: (userId: string, bookId: string, data: UpdateBookDto) => Promise<boolean>; 
}