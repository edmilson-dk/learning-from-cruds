import { Router } from "express";
const multer = require("multer");

import { multerConfig } from "src/drivers/image-upload/multer";
import { RedisDataCache } from "src/infra/repositories/data-cache/redis";
import { adaptRoute } from "src/main/adapters/express-adapter";
import { makeAddBookFactory, makeGetAllBooksFactory, makeGetOneBookFactory, makeUpdateBookFactory } from "src/main/factories/book";
import { makeDeleteBookFactory } from "src/main/factories/book/delete-book-factory";

export const booksRoutes = Router();

const upload = multer(multerConfig);

const dataCacheRepository = new RedisDataCache();

booksRoutes.post("/book/create", upload.single("image"), adaptRoute(makeAddBookFactory(dataCacheRepository)));
booksRoutes.get("/book/all", adaptRoute(makeGetAllBooksFactory(dataCacheRepository)));
booksRoutes.get("/book/:bookId", adaptRoute(makeGetOneBookFactory(dataCacheRepository)));
booksRoutes.delete("/book/:bookId", adaptRoute(makeDeleteBookFactory(dataCacheRepository)));
booksRoutes.put("/book/:bookId", adaptRoute(makeUpdateBookFactory(dataCacheRepository)));