import { AddBookDto, PublicBookDto, PublicUserBookDto, UpdateBookDto } from "src/domain/dtos/book";

export interface IBookUseCases {
  addBook: (data: AddBookDto) => Promise<PublicBookDto>;
  getOneBook: (userId: string, bookId: string) => Promise<PublicUserBookDto>;
  getAllBooks: (userId: string) => Promise<PublicUserBookDto>;
  deleteBook: (userId: string, bookId: string) => Promise<string | null>;
  updateBook: (userId: string, bookId: string, data: UpdateBookDto) => Promise<void>;
}