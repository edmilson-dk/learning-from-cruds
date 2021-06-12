import { Router } from "express";
import { UserSequelizePgRepository } from "src/infra/repositories/sequelize/pg/user";

import booksRoutes from "./books-routes";

const routes = Router();

routes.get("/add", async (req, res) => {
  const r = new UserSequelizePgRepository();
  const data = await r.findUser("42e48c2c-76fa-4722-a8db-259c15db23b2");
  res.status(200).json({ user: data });
})

routes.use(booksRoutes);

export = routes;