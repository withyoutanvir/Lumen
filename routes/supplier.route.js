import express from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} from "../controllers/supplier.controller.js";

const router = express.Router();

// CRUD routes
router.post("/create", createSupplier);
router.get("/getall", getAllSuppliers);
router.get("/:id", getSupplierById);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;
