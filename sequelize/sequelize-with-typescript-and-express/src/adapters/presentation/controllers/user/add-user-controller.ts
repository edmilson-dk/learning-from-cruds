import { IDiskImageStorage } from "src/application/repositories/disk-image-storage";
import { IUserUseCases } from "src/domain/use-cases/user";
import { createJWT } from "src/infra/security/jwt";
import { badRequest, ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";
import { MissingParamError } from "../errors/missing-params-error";

export class AddUserController implements BaseController {
  private readonly userServices: IUserUseCases;
  private readonly diskImageStorage: IDiskImageStorage;

  constructor(userServices: IUserUseCases, diskImageStorage: IDiskImageStorage) {
    this.userServices = userServices;
    this.diskImageStorage = diskImageStorage;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { filename } = httpRequest.rest.file;

    try {
      const { bio, email, name, password } = httpRequest.body;

      if (!name || !email || !password || !bio) {
        return badRequest(new MissingParamError(), 401);
      }

      if (!filename) {
        return badRequest(new Error("Image is missing"), 401);
      }

      const [ originaFileName ] = filename.split('.');
      const imageName = `${originaFileName}.webp`;

      const data = await this.userServices.addUser({
        avatar: imageName,
        bio,
        email,
        name,
        password,
      });

      const imageBuffer = await this.diskImageStorage.resizeImage(httpRequest.rest.file, 300);
      await this.diskImageStorage.saveImage(imageBuffer, httpRequest.rest.file, "user");
      this.diskImageStorage.deleteNotResizedImage(filename);

      const token = createJWT(email, data.id, process.env.TOKEN_EXPIRES as string);

      return ok({...data, token}, 201);
    } catch (err) {
      this.diskImageStorage.deleteNotResizedImage(filename);
      return serverError({ 
        reason: err.message,
        statusCode: 401
      } || { 
        reason: "Interval server error", 
        statusCode: 500 
      });
    }
  }
}