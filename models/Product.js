import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  Product_name: {
    type: String,
    required: true,
    trim: true,
  },
  Decription: {
    type: String,
    required: true,
  },
  Supplier_name: {
    type: String,
    required: true,
    lowercase: true,
  },
  Price: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  orderHistory: [
    {
      orderId: String,
      product: String,
      quantity: Number,
      status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
      },
      orderedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", ProductSchema);
