import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error.js";

export const validateRegistration = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("username").notEmpty().withMessage("User name is required"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password should have a length of 4-20"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    next();
  },
];
