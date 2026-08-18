import { reviewCode } from "../services/apiService.js";

export const review = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "Code and language are required",
      });
    }

    const result = await reviewCode(code, language);

     // Gemini review was successful.
    // Now consume one review from the daily limit.
    const user = req.reviewUser;
    user.reviewsToday += 1;
    user.lastReviewDate = new Date();

    await user.save();

    return res.status(200).json({
      success: true,
      review: result,
    });

  } catch (error) {
    console.error("API Error:", error);

    // Gemini is temporarily unavailable / overloaded
    if (
      error.status === 503 ||
      error.code === 503 ||
      error.message?.includes("503") ||
      error.message?.toLowerCase().includes("overloaded")
    ) {
      return res.status(503).json({
        success: false,
        message:
          "The AI model is currently experiencing high demand. Please try again in a few moments.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to review code",
    });
  }
};