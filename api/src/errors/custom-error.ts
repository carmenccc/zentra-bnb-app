import { ApiError } from "@shared/types/response";

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // Format errors to common response structure: an array of errors
  abstract serializeErrors(): ApiError[];
}

/// Notes:
// Javascript built-in Error class
// class Error {
//     constructor(message) {
//       this.name = 'Error';
//       this.message = message;
//       this.stack = <stack trace>;
//     }
//   }
// Extending the Error class
// export class CustomError extends Error {
//     statusCode: number;
//     details?: any;

//     constructor(message: string, statusCode = 500, details?: any) {
//       super(message);
//       this.name = this.constructor.name;
//       this.statusCode = statusCode;
//       this.details = details;

//       // Fix the prototype chain for instanceof checks
//       Object.setPrototypeOf(this, new.target.prototype);

//       // Optional: Capture stack trace
//       if (Error.captureStackTrace) {
//         Error.captureStackTrace(this, this.constructor);
//       }
//     }
//   }
