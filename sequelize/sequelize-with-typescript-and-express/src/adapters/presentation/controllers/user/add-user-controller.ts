import { IUserUseCases } from "src/domain/use-cases/user";
import { encryptData } from "src/infra/security/bcrypt";
import { ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";

export class AddUserController implements BaseController {
  private readonly userServices: IUserUseCases;

  constructor(userServices: IUserUseCases) {
    this.userServices = userServices;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { avatar, bio, email, name, password, } = httpRequest.body;

      const hashedPassword = await encryptData(password, 10);

      const data = await this.userServices.addUser({
        avatar,
        bio,
        email,
        name,
        password: hashedPassword,
      })

      return ok({}, 201);
    } catch (err) {
      return serverError("Interval server error");
    }
  }
}