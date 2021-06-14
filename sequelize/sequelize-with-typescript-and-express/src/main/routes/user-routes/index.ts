import { Router } from "express";
const multer = require("multer");

import { multerConfig } from "src/drivers/image-upload/multer";
import { adaptRoute } from "src/main/adapters/express-adapter";
import { makeAddUserFactory } from "src/main/factories/user";
import { makeGetUserFactory } from "src/main/factories/user/get-user-factory";

export const userRoutes = Router();

const upload = multer(multerConfig);

userRoutes.post("/register", upload.single("image"), adaptRoute(makeAddUserFactory()));
userRoutes.post("/login", adaptRoute(makeGetUserFactory()));