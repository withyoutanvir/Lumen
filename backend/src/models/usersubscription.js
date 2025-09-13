import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  status: { type: String, enum: ["active", "cancelled", "expired"], default: "active" },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  autoRenew: { type: Boolean, default: false },
  appliedDiscount: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" },
  usageThisPeriodGB: { type: Number, default: 0 },
  history: [{ date: Date, action: String, note: String }],
}, { timestamps: true });

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;