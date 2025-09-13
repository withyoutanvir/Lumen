// import mongoose from 'mongoose';

// const planSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: { type: String },
//   durationDays: { type: Number, default: 30 }
// }, { timestamps: true });

// const Plan = mongoose.model('Plan', planSchema);
// export default Plan;

import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["percentage", "flat"], // percentage (10%) or flat (100 off)
      required: true,
    },
    value: {
      type: Number,
      required: true, // discount amount
    },
    description: {
      type: String,
      default: "",
    },
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      required: true, // expiry date
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quota: {
      type: Number, 
      required: true,
    },
    duration: {
      type: Number, 
      required: true,
    },
    features: {
      type: [String], 
      default: [],
    },
    discounts: {
      type: [discountSchema], 
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);
