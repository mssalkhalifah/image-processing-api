import { Request, Response, NextFunction } from 'express';
import ErrorException from './errorException';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof ErrorException) {
    res
      .status(error.statusCode)
      .send({ statusCode: error.statusCode, message: error.message });
  } else {
    res.status(500).send('Something is wrong.');
  }

  next();
};

export default errorHandler;
