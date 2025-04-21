import { Router } from "express";
import { register } from "../controllers/auth.controller.js";

const router = Router();

// Official type of a route handler
// type RequestHandler = (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void | Promise<void>;

router.post("/register", register);

export default router;
