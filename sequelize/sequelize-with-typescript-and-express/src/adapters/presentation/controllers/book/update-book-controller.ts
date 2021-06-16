import { IBookUseCases } from "src/domain/use-cases/book";
import { ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";

export class UpdateBookController implements BaseController {
  private readonly bookServices: IBookUseCases;

  constructor(bookServices: IBookUseCases) {
    this.bookServices = bookServices;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { bookId } = httpRequest.params;
      const { title, author, pages_total, released } = httpRequest.body;
      const userId = httpRequest.rest.userId;

      await this.bookServices.updateBook(userId, bookId, 
        { title, author, pages_total, released });

      return ok([], 200);
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