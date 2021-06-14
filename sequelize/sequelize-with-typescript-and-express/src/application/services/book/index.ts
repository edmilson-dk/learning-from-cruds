import { IBookRepository } from "src/application/repositories/book";
import { AddBookDto, PublicBookDto, PublicUserBookDto } from "src/domain/dtos/book";
import { IBookUseCases } from "src/domain/use-cases/book";

export class BookServices implements IBookUseCases {
  private readonly bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async addBook(data: AddBookDto): Promise<PublicBookDto> {
    const book = await this.bookRepository.addBook(data);
    return book;
  }

  async getOneBook(userId: string, bookId: string): Promise<PublicUserBookDto> {
    const book = await this.bookRepository.getOneBook(userId, bookId);
    return book;
  }

  async getAllBooks(userId: string): Promise<PublicUserBookDto> {
    const books = await this.bookRepository.getAllBooks(userId);
    return books;
  }
}