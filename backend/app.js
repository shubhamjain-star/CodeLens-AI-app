import "dotenv/config";
import connectDB from "./config/dbConfig.js";
import express from "express";
import cors from "cors";

import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/review", reviewRoutes);
app.use("/api/auth",authRoutes);

// environment variable checks
console.log("Gemini key exists:", !!process.env.GEMINI_API_KEY);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET_KEY);

// database connection
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});