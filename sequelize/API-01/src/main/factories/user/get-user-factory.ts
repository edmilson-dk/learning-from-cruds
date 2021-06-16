import { BaseController } from "src/adapters/presentation/controllers/baseControler";
import { GetUserController } from "src/adapters/presentation/controllers/user";
import { UserServices } from "src/application/services/user";
import { UserSequelizePgRepository } from "src/infra/repositories/sequelize/pg/user";

export function makeGetUserFactory(): BaseController {
  const userRepository = new UserSequelizePgRepository();
  const userServices = new UserServices(userRepository);
  const controller = new GetUserController(userServices);

  return controller;
}