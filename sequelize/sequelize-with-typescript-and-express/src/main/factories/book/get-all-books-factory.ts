import { BaseController } from "src/adapters/presentation/controllers/baseControler";
import { GetAllBooksController } from "src/adapters/presentation/controllers/book";
import { BookServices } from "src/application/services/book";
import { BookSequelizePgRepository } from "src/infra/repositories/sequelize/pg/book";

export function makeGetAllBooksFactory(): BaseController {
  const bookRepository = new BookSequelizePgRepository();
  const bookServices = new BookServices(bookRepository);
  const controller = new GetAllBooksController(bookServices);

  return controller;
}