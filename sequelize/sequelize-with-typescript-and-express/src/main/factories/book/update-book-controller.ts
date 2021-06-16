import { BaseController } from "src/adapters/presentation/controllers/baseControler";
import { UpdateBookController } from "src/adapters/presentation/controllers/book";
import { IDataCacheRepository } from "src/application/repositories/data-cache";
import { BookServices } from "src/application/services/book";
import { BookSequelizePgRepository } from "src/infra/repositories/sequelize/pg/book";

export function makeUpdateBookFactory(dataCacheRepository: IDataCacheRepository): BaseController {
  const bookRepository = new BookSequelizePgRepository();
  const bookServices = new BookServices(bookRepository, dataCacheRepository);
  const controller = new UpdateBookController(bookServices);

  return controller;
}