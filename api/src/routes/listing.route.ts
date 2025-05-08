import express from "express";
import {
  addListing,
  deleteListing,
  getListing,
  getListings,
  saveListing,
  unsaveListing,
} from "../controllers/listing.controller";
import { verifyToken } from "../middlewares/verify-token";

const router = express.Router();

router.get("/", getListings);
router.get("/:id", getListing);
// router.get("/:id/detail");
router.post("/", verifyToken, addListing);
// router.put("/:id");
router.delete("/:id", verifyToken, deleteListing);
router.post("/save", verifyToken, saveListing);
router.delete("/save/:id", verifyToken, unsaveListing);

export default router;
