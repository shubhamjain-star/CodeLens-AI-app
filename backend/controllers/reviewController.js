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

    res.status(200).json({
      success: true,
      review: result,
    });

  } catch (error) {
    console.error("API Error:", error);

    res.status(500).json({
      success: false,
      message: error.message||"Failed to review code",
    });
  }
};