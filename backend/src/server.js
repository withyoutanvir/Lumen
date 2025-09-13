import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import app from "./app.js";
import { MONGO_URI, PORT } from "./config/env.js";

// Load .env from backend folder
dotenv.config({ path: path.resolve("../.env") });

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");

    // Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
