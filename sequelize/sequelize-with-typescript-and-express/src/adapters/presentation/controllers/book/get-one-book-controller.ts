import { IBookUseCases } from "src/domain/use-cases/book";
import { ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";

export class GetOneBookController implements BaseController {
  private readonly bookServices: IBookUseCases;

  constructor(bookServices: IBookUseCases) {
    this.bookServices = bookServices;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { bookId } = httpRequest.params;
      const userId = httpRequest.rest.userId;

      const book = await this.bookServices.getOneBook(userId, bookId);

      return ok(book, 200);
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