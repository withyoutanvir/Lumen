import mongoose from 'mongoose';
import { MONGO_URI } from './env.js';

console.log('DB.js MONGO_URI:', MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
