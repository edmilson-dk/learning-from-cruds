import { Router } from "express";

import { booksRoutes } from "./books-routes";
import { userRoutes } from "./user-routes";

export const routes = Router();

routes.use(booksRoutes);
routes.use(userRoutes);
