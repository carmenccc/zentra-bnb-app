import { Router } from "express";

import { register } from "../controllers/auth.controller.js";
import { validateRegistration } from "../middlewares/validators.js";

const router = Router();

router.post("/register", validateRegistration, register);

export default router;

/// Notes:
// Official type of a route handler
// type RequestHandler = (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void | Promise<void>;
