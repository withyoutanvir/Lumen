import express from "express";
import {
  createPlan,
  getPlansByEmail,
  getPlanByEmail,
  updatePlanByName,
  deletePlanByEmail,
  addDiscountByEmail,
  removeDiscountByEmail,
} from "../controllers/plancontroller.js";

const router = express.Router();

// All operations now require email in body
router.post("/create", createPlan);
router.post("/all", getPlansByEmail);
router.post("/get", getPlanByEmail);
router.put("/update", updatePlanByEmail);
router.delete("/delete", deletePlanByEmail);

// Discounts
router.post("/add-discount", addDiscountByEmail);
router.delete("/remove-discount", removeDiscountByEmail);

export default router;
