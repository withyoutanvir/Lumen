import mongoose from "mongoose";

const UsageSchema = new mongoose.Schema({
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  bytesUsed: { type: Number, default: 0 },
});

export default mongoose.model("Usage", UsageSchema);
