import { IBookUseCases } from "src/domain/use-cases/book";
import { ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";

export class GetAllBooksController implements BaseController {
  private readonly bookServices: IBookUseCases;

  constructor(bookServices: IBookUseCases) {
    this.bookServices = bookServices;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.rest.userId;
      const { page } = httpRequest.query;

      const books = await this.bookServices.getAllBooks(userId, Number(page) || 1);

      return ok(books, 200);
    } catch (err) {
      return serverError(
        { reason: err.message,
          statusCode: 401
        } || { 
          reason: "Interval server error", 
          statusCode: 500 
        }
      );
    }
  }
}