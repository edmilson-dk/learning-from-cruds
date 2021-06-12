import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import { routes } from "../routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images/user", express.static(path.resolve(__dirname, '..', '..', '..', 'uploads', 'resized', 'user')));
app.use("/images/book", express.static(path.resolve(__dirname, '..', '..', '..', 'uploads', 'resized', 'book')));

app.use("/api", routes);

export = app;