import express from "express";
import {
  createReservation,
  deleteReservation,
} from "../controllers/reservation.controller";
import { verifyToken } from "../middlewares/verify-token";

const router = express.Router();

router.post("/", verifyToken, createReservation);
router.delete("/:id", verifyToken, deleteReservation);

export default router;
