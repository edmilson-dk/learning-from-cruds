import { IUserUseCases } from "src/domain/use-cases/user";
import { isValidHash } from "src/infra/security/bcrypt";
import { createJWT } from "src/infra/security/jwt";
import { badRequest, ok, serverError } from "../../http/http-response-type";
import { HttpRequest, HttpResponse } from "../../http/ports/http";
import { BaseController } from "../baseControler";
import { MissingParamError } from "../errors/missing-params-error";

export class GetUserController implements BaseController {
  private readonly userServices: IUserUseCases;

  constructor(userServices: IUserUseCases) {
    this.userServices = userServices;
  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      if (!email || !password) {
        return badRequest(new MissingParamError(), 401);
      }

      const user = await this.userServices.getUser(email, password);

      if (!user) {
        return badRequest(new Error("User not found"), 404);
      }

      const token = createJWT(email, user.id, process.env.TOKEN_EXPIRES as string);

      return ok({...user, token }, 200);
    } catch (err) {
      return serverError(err.message || "Interval server error");
    }
  }
}