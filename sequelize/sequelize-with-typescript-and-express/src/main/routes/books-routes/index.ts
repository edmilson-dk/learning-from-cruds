import { Router } from "express";
const multer = require("multer");

import { multerConfig } from "src/drivers/image-upload/multer";
import { RedisDataCache } from "src/infra/repositories/data-cache/redis";
import { adaptRoute } from "src/main/adapters/express-adapter";
import { makeAddBookFactory, makeGetAllBooksFactory } from "src/main/factories/book";

export const booksRoutes = Router();

const upload = multer(multerConfig);

const dataCacheRepository = new RedisDataCache();

booksRoutes.post("/book/create", upload.single("image"), adaptRoute(makeAddBookFactory(dataCacheRepository)));
booksRoutes.get("/book/all", adaptRoute(makeGetAllBooksFactory(dataCacheRepository)));