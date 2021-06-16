import { IDiskImageStorage } from "src/application/repositories/disk-image-storage";
import { IBookUseCases } from "src/domain/use-cases/book";
import { ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";

export class DeleteBookController implements BaseController {
  private readonly bookServices: IBookUseCases;
  private readonly diskImageStorage: IDiskImageStorage;

  constructor(bookServices: IBookUseCases, diskImageStorage: IDiskImageStorage) {
    this.bookServices = bookServices;
    this.diskImageStorage = diskImageStorage;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { bookId } = httpRequest.params;
      const userId = httpRequest.rest.userId;

      const imageNameOrNull = await this.bookServices.deleteBook(userId, bookId);

      if (imageNameOrNull) {
        this.diskImageStorage.deleteResizedImage(imageNameOrNull, "book");
      }
      return ok([ imageNameOrNull ], 200);
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