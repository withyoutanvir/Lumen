<<<<<<< HEAD
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import app from './app.js';
import { MONGO_URI, PORT } from './config/env.js';

// Load .env from backend folder
dotenv.config({ path: path.resolve('../.env') }); 

console.log('Loaded MONGO_URI:', process.env.MONGO_URI);
=======
// server.js
import dotenv from "dotenv";
dotenv.config(); // Load .env variables

import mongoose from "mongoose";
import express from "express";

const app = express();

// Config
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
>>>>>>> f0d790a5 (fixed server bugs)

// Middleware (example)
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Server is running on localhost!");
});

// Connect to MongoDB
mongoose
<<<<<<< HEAD
  .connect(process.env.MONGO_URI) // use process.env directly
  .then(() => console.log('MongoDB connected'))
=======
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");

    // Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
>>>>>>> f0d790a5 (fixed server bugs)
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
<<<<<<< HEAD

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
=======
>>>>>>> f0d790a5 (fixed server bugs)
