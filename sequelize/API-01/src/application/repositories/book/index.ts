import { AddBookDto, PublicBookDto, PublicUserAllBooksDto, PublicUserBookDto, UpdateBookDto } from "src/domain/dtos/book";

export interface IBookRepository {
  addBook: (data: AddBookDto) => Promise<PublicBookDto>;
  getOneBook: (userId: string, bookId: string) => Promise<PublicUserBookDto>;
  getAllBooks: (userId: string, page: number) => Promise<PublicUserAllBooksDto>;
  deleteBook: (userId: string, bookId: string) => Promise<string | null>;
  updateBook: (userId: string, bookId: string, data: UpdateBookDto) => Promise<boolean>; 
}