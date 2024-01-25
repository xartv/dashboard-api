import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';
import { HTTPError } from '../errors/http-error.class';

export class AuthGuard implements IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      return next();
    }

    res.status(401).send({ error: 'You are not authorized' });
  }
}
