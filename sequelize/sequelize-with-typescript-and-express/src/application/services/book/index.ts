import { IBookRepository } from "src/application/repositories/book";
import { IDataCacheRepository } from "src/application/repositories/data-cache";
import { AddBookDto, PublicBookDto, PublicUserBookDto } from "src/domain/dtos/book";
import { BookMapper } from "src/domain/mappers/book";
import { IBookUseCases } from "src/domain/use-cases/book";
import { isInvalidBookCreateData } from "src/domain/validations/book";

export class BookServices implements IBookUseCases {
  private readonly bookRepository: IBookRepository;
  private readonly dataCacheRepository: IDataCacheRepository;

  constructor(bookRepository: IBookRepository, dataCacheRepository: IDataCacheRepository) {
    this.bookRepository = bookRepository;
    this.dataCacheRepository = dataCacheRepository;
  }

  async addBook(data: AddBookDto): Promise<PublicBookDto> {
    const validateResult = isInvalidBookCreateData(data);

    if (validateResult) {
      throw new Error(validateResult.message);
    }
    
    const book = await this.bookRepository.addBook(data);
    return book;
  }

  async getOneBook(userId: string, bookId: string): Promise<PublicUserBookDto> {
    const book = await this.bookRepository.getOneBook(userId, bookId);
    return book;
  }

  async getAllBooks(userId: string): Promise<PublicUserBookDto> {
    const cached = await this.dataCacheRepository.getCache("books");

    if (cached) {
      console.log("cache")
      return BookMapper.toPublicUserDto(cached);
    }

    console.log("database")
    const books = await this.bookRepository.getAllBooks(userId);
    this.dataCacheRepository.setCache("books", books, 20);

    return books;
  }
}