import { IBookRepository } from "src/application/repositories/book";
import { IDataCacheRepository } from "src/application/repositories/data-cache";
import { constants } from "src/constants";
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
    const cached = await this.dataCacheRepository.getCache(constants.oneBookCacheKey);

    if (cached) {
      return BookMapper.toPublicUserDto(cached);
    }

    const book = await this.bookRepository.getOneBook(userId, bookId);
    this.dataCacheRepository.setCache(constants.oneBookCacheKey, book, constants.cacheExpires);

    return book;
  }

  async getAllBooks(userId: string): Promise<PublicUserBookDto> {
    const cached = await this.dataCacheRepository.getCache(constants.allBooksCacheKey);

    if (cached) {
      return BookMapper.toPublicUserDto(cached);
    }

    const books = await this.bookRepository.getAllBooks(userId);
    this.dataCacheRepository.setCache(constants.allBooksCacheKey, books, constants.cacheExpires);

    return books;
  }

  async deleteBook(userId: string, bookId: string): Promise<string | null> {
    const imageNameOrNull = await this.bookRepository.deleteBook(userId, bookId);
    return imageNameOrNull;
  }
}