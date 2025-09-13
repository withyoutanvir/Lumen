import mongoose from 'mongoose';

const analyticSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: String, required: true },
  details: { type: Object },
  timestamp: { type: Date, default: Date.now }
});

const Analytic = mongoose.model('Analytic', analyticSchema);
export default Analytic;
