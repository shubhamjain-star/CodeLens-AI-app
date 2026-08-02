
import User from "../models/User.js";

const DAILY_LIMIT = 5;

export const rateLimit = async (req, res, next) => {
  try {
    // protect middleware should run before rateLimit
    // so req.user is available
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get today's date
    const today = new Date();

    // Check whether the last review was on a previous day
    const isNewDay =
      !user.lastReviewDate ||
      user.lastReviewDate.toDateString() !== today.toDateString();

    // If it's a new day, reset the counter
    if (isNewDay) {
      user.reviewsToday = 0;
    }

    // Check daily limit
    if (user.reviewsToday >= DAILY_LIMIT) {
      return res.status(429).json({
        message:
          "Daily review limit reached. You can make only 5 code reviews per day.",
        reviewsToday: user.reviewsToday,
        remainingReviews: 0,
      });
    }

    // Consume one request
    user.reviewsToday += 1;
    user.lastReviewDate = today;

    await user.save();

    // Continue to review controller
    next();

  } catch (error) {
    console.error("Rate limit error:", error);

    return res.status(500).json({
      message: "Unable to check daily review limit",
    });
  }
};
