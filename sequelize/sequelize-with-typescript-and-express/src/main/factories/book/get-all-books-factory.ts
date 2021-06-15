import { BaseController } from "src/adapters/presentation/controllers/baseControler";
import { GetAllBooksController } from "src/adapters/presentation/controllers/book";
import { IDataCacheRepository } from "src/application/repositories/data-cache";
import { BookServices } from "src/application/services/book";
import { BookSequelizePgRepository } from "src/infra/repositories/sequelize/pg/book";

export function makeGetAllBooksFactory(dataCacheRepository: IDataCacheRepository): BaseController {
  const bookRepository = new BookSequelizePgRepository();
  const bookServices = new BookServices(bookRepository, dataCacheRepository);
  const controller = new GetAllBooksController(bookServices);

  return controller;
}