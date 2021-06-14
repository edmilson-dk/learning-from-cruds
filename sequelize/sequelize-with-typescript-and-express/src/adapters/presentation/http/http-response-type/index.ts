import { HttpResponse } from "../ports/http";
import { ServerError } from "../../controllers/errors/server-error";

export const badRequest = (error: Error, statusCode = 400): HttpResponse => ({
  statusCode,
  body: error.message
});

export const ok = (data: any, statusCode = 200): HttpResponse => ({
  statusCode,
  body: data
});

type ServerErrorProps = { reason: string, statusCode: number };

export const serverError = (data: ServerErrorProps): HttpResponse => ({
  statusCode: data.statusCode,
  body: data.reason,
});
