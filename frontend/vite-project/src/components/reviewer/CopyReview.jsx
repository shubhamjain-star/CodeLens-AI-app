import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const CopyReview = ({ review }) => {
  const handleCopyReview = async () => {
    try {
      if (!review) return;

      const reviewText = `
CODE REVIEW REPORT

OVERALL ASSESSMENT
${review.summary || "No summary available."}

BUGS
${
  review.bugs?.length > 0
    ? review.bugs
        .map(
          (bug, index) => `
${index + 1}. ${bug.title || "Untitled Bug"}
Severity: ${bug.severity || "N/A"}
Description: ${bug.description || "No description available."}
${bug.line ? `Line: ${bug.line}` : ""}
`
        )
        .join("\n")
    : "No bugs detected."
}

COMPLEXITY
Time Complexity: ${review.complexity?.time || "N/A"}
Space Complexity: ${review.complexity?.space || "N/A"}

${review.complexity?.explanation || "No explanation available."}

CODE QUALITY
Score: ${review.codeQuality?.score ?? 0}/10

${
  review.codeQuality?.comments?.length > 0
    ? review.codeQuality.comments
        .map((comment) => `• ${comment}`)
        .join("\n")
    : "No code quality comments available."
}

SECURITY
${
  review.securityIssues?.length > 0
    ? review.securityIssues
        .map((issue) => `• ${issue}`)
        .join("\n")
    : "No security issues detected."
}

SUGGESTIONS
${
  review.suggestions?.length > 0
    ? review.suggestions
        .map((suggestion) => `• ${suggestion}`)
        .join("\n")
    : "No suggestions available."
}

IMPROVED CODE
${review.improvedCode || "No improved code available."}
      `.trim();

      await navigator.clipboard.writeText(reviewText);

      toast.success("Review copied to clipboard");
    } catch (error) {
      console.error("Copy review failed:", error);

      toast.error("Failed to copy review");
    }
  };

  return (
    <button
      onClick={handleCopyReview}
      title="Copy Review"
      aria-label="Copy Review"
      className="flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-colors cursor-pointer"
    >
      <FontAwesomeIcon
        icon={faCopy}
        className="h-4 w-4"
      />
    </button>
  );
};

export default CopyReview;