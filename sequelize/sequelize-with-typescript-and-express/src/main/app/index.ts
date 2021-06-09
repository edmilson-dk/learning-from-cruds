import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "../routes";

const app = express();

app.use(cors());
app.use(helmet());

app.use("/api", routes);

export = app;