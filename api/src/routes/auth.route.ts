import { Router } from "express";

import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegistration,
} from "../middlewares/validators.js";

const router = Router();

router.get("/currentuser", getCurrentUser);
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

export default router;

/// Notes:
// Official type of a route handler
// type RequestHandler = (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void | Promise<void>;
