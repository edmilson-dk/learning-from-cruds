import { Router } from "express";
import booksRoutes from "./books-routes";

const routes = Router();

routes.use(booksRoutes);

export = routes;