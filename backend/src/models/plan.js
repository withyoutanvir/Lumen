import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  durationDays: { type: Number, default: 30 }
}, { timestamps: true });

const Plan = mongoose.model('Plan', planSchema);
export default Plan;