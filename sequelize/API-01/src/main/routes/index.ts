import { Router } from "express";
import authMiddleware from "../middlewares/routes/auth-user-token-middleware";

import { booksRoutes } from "./books-routes";
import { userRoutes } from "./user-routes";

export const routes = Router();

routes.use("/session", authMiddleware);

routes.use("/session", booksRoutes);
routes.use("/user", userRoutes);
