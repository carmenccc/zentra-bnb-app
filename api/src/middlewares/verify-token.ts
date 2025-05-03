import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ForbiddenError } from "../errors/forbidden-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if session & jwt exists
  if (!req.session?.jwt) throw new UnauthorizedError("Not authenticated");

  // Verify if jwt is valid
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as {
      id: number;
    };

    (req as Request & { userId: number }).userId = payload.id;

    next();
  } catch (err) {
    throw new ForbiddenError("Invalid access");
  }
};
