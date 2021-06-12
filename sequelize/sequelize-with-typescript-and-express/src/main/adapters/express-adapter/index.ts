import { Request, Response } from "express";

import { BaseController } from "src/adapters/presentation/controllers/baseControler";
import { HttpRequest } from "src/adapters/presentation/http/ports/http";

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      rest: {...req},
    };
    
    const httpResponse = await controller.execute(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
}
