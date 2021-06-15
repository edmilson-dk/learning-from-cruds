import { BaseController } from "src/adapters/presentation/controllers/baseControler";
import { AddBookController } from "src/adapters/presentation/controllers/book";
import { IDataCacheRepository } from "src/application/repositories/data-cache";
import { BookServices } from "src/application/services/book";
import { SharpDiskImageStorage } from "src/drivers/image-upload/sharp";
import { BookSequelizePgRepository } from "src/infra/repositories/sequelize/pg/book";

export function makeAddBookFactory(dataCacheRepository: IDataCacheRepository): BaseController {
  const bookRepository = new BookSequelizePgRepository();
  const bookServices = new BookServices(bookRepository, dataCacheRepository);
  const diskImageStorage =new SharpDiskImageStorage();
  const controller = new AddBookController(bookServices, diskImageStorage);

  return controller;
}