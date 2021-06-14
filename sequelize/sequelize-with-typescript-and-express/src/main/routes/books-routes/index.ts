import { Router } from "express";
const multer = require("multer");

import { multerConfig } from "src/drivers/image-upload/multer";
import { adaptRoute } from "src/main/adapters/express-adapter";
import { makeAddBookFactory } from "src/main/factories/book";

export const booksRoutes = Router();

const upload = multer(multerConfig);

booksRoutes.post("/book/create", upload.single("image"), adaptRoute(makeAddBookFactory()));