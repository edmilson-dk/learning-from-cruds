import { Router } from "express";
import { multerConfig } from "src/drivers/image-upload/multer";
import { adaptRoute } from "src/main/adapters/express-adapter";
import { makeAddUserFactory } from "src/main/factories/user";
import { makeGetUserFactory } from "src/main/factories/user/get-user-factory";
const multer = require("multer");

export const userRoutes = Router();

const upload = multer(multerConfig);

userRoutes.post("/user/register", upload.single("image"), adaptRoute(makeAddUserFactory()));
userRoutes.post("/user/login", adaptRoute(makeGetUserFactory()));