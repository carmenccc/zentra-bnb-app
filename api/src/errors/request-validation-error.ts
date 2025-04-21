import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error.js";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  // add new custom property
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    // Fix the prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      if ("path" in error) return { message: error.msg, field: error.path };
      return { message: error.msg };
    });
  }
}
