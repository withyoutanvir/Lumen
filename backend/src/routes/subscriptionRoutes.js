import express from "express";
import { protect } from "../middleware/auth.js"; // ✅ fixed
import {
  createSubscription,
  modifySubscription,
  cancelSubscription,
  renewSubscription,
  getUserSubscriptions
} from "../controllers/subcriptioncontroller.js";

const router = express.Router();

router.post("/", protect, createSubscription);
router.put("/:subscriptionId", protect, modifySubscription);
router.delete("/:subscriptionId", protect, cancelSubscription);
router.post("/:subscriptionId/renew", protect, renewSubscription);
router.get("/", protect, getUserSubscriptions);

export default router;
