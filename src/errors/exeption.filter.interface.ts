import { NextFunction, Request, Response } from "express";
import { HTTPError } from "./http-error.class";

export interface IExeptionFilterInterface {
  catch: (err: HTTPError, req: Request, res: Response, next: NextFunction) => void;
}
