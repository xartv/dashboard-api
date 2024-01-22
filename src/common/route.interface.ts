import { Request, Response, NextFunction, Router } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  middlewares?: IMiddleware[];
}

export type ExressReturnType = Response<any, Record<string, any>>;
