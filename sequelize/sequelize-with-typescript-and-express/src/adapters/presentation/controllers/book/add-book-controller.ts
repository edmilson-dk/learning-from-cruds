import { IDiskImageStorage } from "src/application/repositories/disk-image-storage";
import { IBookUseCases } from "src/domain/use-cases/book";
import { badRequest, ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";

export class AddBookController implements BaseController {
  private readonly bookServices: IBookUseCases;
  private readonly diskImageStorage: IDiskImageStorage;

  constructor(bookServices: IBookUseCases, diskImageStorage: IDiskImageStorage) {
    this.bookServices = bookServices;
    this.diskImageStorage = diskImageStorage;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { filename } = httpRequest.rest.file;

    try {
      const { title, author, released, pages_total, likes, dislikes } = httpRequest.body;
      const userId = httpRequest.rest.userId;

      if (!filename) {
        return badRequest(new Error("Image is missing"), 401);
      }

      const [ originaFileName ] = filename.split('.');
      const imageName = `${originaFileName}.webp`;

      const book = await this.bookServices.addBook({
        title, author, released, 
        pages_total, likes, dislikes, 
        user_id: userId, image_name: imageName,
      });

      const imageBuffer = await this.diskImageStorage.resizeImage(httpRequest.rest.file, 300);
      await this.diskImageStorage.saveImage(imageBuffer, httpRequest.rest.file, "book");
      this.diskImageStorage.deleteNotResizedImage(filename);

      return ok(book, 201);
    } catch (err) {
      this.diskImageStorage.deleteNotResizedImage(filename);
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