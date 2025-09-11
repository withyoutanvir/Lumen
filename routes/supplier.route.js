import express from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierByEmail,
  updateSupplierByEmail,
  deleteSupplierByEmail
} from "../controllers/supplier.controller.js";

const router = express.Router();

// CRUD routes
router.post("/create", createSupplier);
router.get("/getall", getAllSuppliers);
router.get("/getSupplier/:email", getSupplierByEmail);
router.put("/update/:email", updateSupplierByEmail);
router.delete("/deletesupplier/:email", deleteSupplierByEmail);

export default router;
