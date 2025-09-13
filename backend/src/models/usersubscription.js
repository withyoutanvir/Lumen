import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  status: {
    type: String,
    enum: ["active", "cancelled", "expired"],
    default: "active",
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  autoRenew: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

subscriptionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
