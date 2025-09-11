import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: ""
  },
  orderHistory: [
    {
      orderId: String,
      product: String,
      quantity: Number,
      status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending"
      },
      orderedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Supplier", supplierSchema);
