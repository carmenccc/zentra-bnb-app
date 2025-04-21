import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error.js";

/// All response will be formated as {errors: {message: string, field?: string}[]}
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }

  // Unkown error
  res.status(400).send({
    errors: [{ message: err.message }],
  });
};

/// Notes:
// ErrorRequestHandler - a type from Express
// describes error-handling middleware functions
// (err: any, req: Request, res: Response, next: NextFunction) => void
