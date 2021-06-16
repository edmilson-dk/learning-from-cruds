import { BaseController } from "src/adapters/presentation/controllers/baseControler";
import { AddUserController } from "src/adapters/presentation/controllers/user";
import { UserServices } from "src/application/services/user";
import { SharpDiskImageStorage } from "src/drivers/image-upload/sharp";
import { UserSequelizePgRepository } from "src/infra/repositories/sequelize/pg/user";

export function makeAddUserFactory(): BaseController {
  const userRepository = new UserSequelizePgRepository();
  const userServices = new UserServices(userRepository);
  const diskImageStorage =new SharpDiskImageStorage();
  const controller = new AddUserController(userServices, diskImageStorage);

  return controller;
}