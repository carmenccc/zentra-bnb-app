import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error.js";
import { ApiResponse } from "@shared/types/response.js";

/// All response will be formated as ApiResponse
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .send({ success: false, errors: err.serializeErrors() });
    return;
  }

  // Unkown error
  res.status(400).send({ success: false, errors: [{ message: err.message }] });
};

/// Notes:
// ErrorRequestHandler - a type from Express
// describes error-handling middleware functions
// (err: any, req: Request, res: Response, next: NextFunction) => void
