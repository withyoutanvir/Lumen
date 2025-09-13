import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app.js';
import { MONGO_URI, PORT } from './config/env.js';

console.log('Loaded MONGO_URI:', MONGO_URI);


mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
