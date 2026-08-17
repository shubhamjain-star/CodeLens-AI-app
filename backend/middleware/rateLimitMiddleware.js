import User from "../models/User.js";
import { formatInTimeZone } from "date-fns-tz";

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

    // Get user's timezone
    const timezone = user.timezone || "UTC";

    // Get today's date according to user's timezone
    const today = formatInTimeZone(
      new Date(),
      timezone,
      "yyyy-MM-dd"
    );

    // Get the date of the user's last review
    // according to user's timezone
    const lastReviewDay = user.lastReviewDate
      ? formatInTimeZone(
          user.lastReviewDate,
          timezone,
          "yyyy-MM-dd"
        )
      : null;

      // Debug logs
      console.log("User timezone:", timezone);
      console.log("Today's local date:", today);
      console.log("Last review local date:", lastReviewDay);
      

    // Check whether user's local calendar day has changed
    const isNewDay =
      !lastReviewDay || lastReviewDay !== today;

    console.log("reviewsToday BEFORE:", user.reviewsToday);
    console.log("isNewDay:", isNewDay);

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

    // Store the actual current timestamp
    user.lastReviewDate = new Date();

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