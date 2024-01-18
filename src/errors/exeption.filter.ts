import { NextFunction, Request, Response } from "express";
import { IExeptionFilterInterface } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class";
import { ILogger } from "../logger/logger.interface";

export class ExeptionFilter implements IExeptionFilterInterface {
  logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[${err.context}] Error ${err.statusCode}: ${err.message}`
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
