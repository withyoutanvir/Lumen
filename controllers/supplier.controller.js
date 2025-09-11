import Supplier from "../models/supplier.model.js";

// Add new supplier
export const createSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json({ message: "Supplier created successfully", supplier });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all suppliers
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single supplier
// Get supplier by email
export const getSupplierByEmail = async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ email: req.params.email });
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update supplier by email
export const updateSupplierByEmail = async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.json({ message: "Supplier updated successfully", supplier });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete supplier by email
export const deleteSupplierByEmail = async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndDelete({ email: req.params.email });
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
