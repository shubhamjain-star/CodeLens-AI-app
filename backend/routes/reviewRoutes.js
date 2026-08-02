import express from "express";
import { review } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { rateLimit } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post("/", protect,rateLimit,review);

export default router;