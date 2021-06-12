import { IDiskImageStorage } from "src/application/repositories/disk-image-storage";
import { IUserUseCases } from "src/domain/use-cases/user";
import { encryptData } from "src/infra/security/bcrypt";
import { createJWT } from "src/infra/security/jwt";
import { badRequest, ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";

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

      if (!filename) {
        return badRequest(new Error("Image is missing"), 401);
      }

      const [ originaFileName ] = filename.split('.');
      const imageName = `${originaFileName}.webp`;
  
      const hashedPassword = await encryptData(password, 10);

      const data = await this.userServices.addUser({
        avatar: imageName,
        bio,
        email,
        name,
        password: hashedPassword,
      });

      const imageBuffer = await this.diskImageStorage.resizeImage(httpRequest.rest.file, 300);
      await this.diskImageStorage.saveImage(imageBuffer, httpRequest.rest.file, "user");
      this.diskImageStorage.deleteNotResizedImage(filename);

      const token = createJWT(email, data.id, "3d");

      return ok({...data, token}, 201);
    } catch (err) {
      this.diskImageStorage.deleteNotResizedImage(filename);
      return serverError("Interval server error");
    }
  }
}