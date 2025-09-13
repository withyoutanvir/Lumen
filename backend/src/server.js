import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import app from './app.js';
import { MONGO_URI, PORT } from './config/env.js';

// Load .env from backend folder
dotenv.config({ path: path.resolve('../.env') }); 

console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI) // use process.env directly
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
