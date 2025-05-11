import express from "express";
import { verifyToken } from "../middlewares/verify-token";
import {
  getUserListings,
  getSavedListings,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/listings", verifyToken, getUserListings);
router.get("/saved", verifyToken, getSavedListings);

export default router;
