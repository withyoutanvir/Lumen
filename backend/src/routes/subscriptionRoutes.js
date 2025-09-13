import express from "express";
import auth from "../middleware/auth.js";
import {
  createSubscription,
  modifySubscription,
  cancelSubscription,
  renewSubscription,
  getUserSubscriptions,
} from "../controllers/subscriptionController.js";

const router = express.Router();

// User routes
router.post("/", auth, createSubscription);
router.put("/:subscriptionId", auth, modifySubscription);
router.delete("/:subscriptionId", auth, cancelSubscription);
router.post("/:subscriptionId/renew", auth, renewSubscription);
router.get("/", auth, getUserSubscriptions);

export default router;
