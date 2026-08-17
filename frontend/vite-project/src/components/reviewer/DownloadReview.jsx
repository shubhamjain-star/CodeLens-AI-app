import jsPDF from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const DownloadReview = ({ review }) => {
  const handleDownload = () => {
    try {
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const margin = 15;
      const contentWidth = pageWidth - margin * 2;

      let y = 20;

      // Helper function to check page space
      const checkPage = (requiredSpace = 20) => {
        if (y + requiredSpace > pageHeight - 15) {
          doc.addPage();
          y = 20;
        }
      };

      // Helper function to add section heading
      const addHeading = (title) => {
        checkPage(20);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text(title, margin, y);

        y += 7;
      };

      // Helper function to add wrapped text
      const addText = (text, font = "helvetica") => {
        doc.setFont(font, "normal");
        doc.setFontSize(10);

        const lines = doc.splitTextToSize(
          text || "",
          contentWidth
        );

        lines.forEach((line) => {
          checkPage(8);
          doc.text(line, margin, y);
          y += 5;
        });

        y += 3;
      };

      // =========================
      // TITLE
      // =========================

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Code Review Report", margin, y);

      y += 12;

      // =========================
      // OVERALL ASSESSMENT
      // =========================

      addHeading("Overall Assessment");

      addText(
        review.summary || "No summary available."
      );

      // =========================
      // BUGS
      // =========================

      addHeading("Bugs");

      if (review.bugs?.length > 0) {
        review.bugs.forEach((bug, index) => {
          addText(
            `${index + 1}. ${bug.title || "Untitled Bug"}`
          );

          addText(
            `Severity: ${bug.severity || "N/A"}`
          );

          addText(
            `Description: ${
              bug.description || "No description available."
            }`
          );

          if (bug.line) {
            addText(`Line: ${bug.line}`);
          }

          y += 2;
        });
      } else {
        addText("No bugs detected.");
      }

      // =========================
      // COMPLEXITY
      // =========================

      addHeading("Complexity");

      addText(
        `Time Complexity: ${
          review.complexity?.time || "N/A"
        }`
      );

      addText(
        `Space Complexity: ${
          review.complexity?.space || "N/A"
        }`
      );

      addText(
        review.complexity?.explanation ||
          "No explanation available."
      );

      // =========================
      // CODE QUALITY
      // =========================

      addHeading("Code Quality");

      addText(
        `Score: ${review.codeQuality?.score ?? 0}/10`
      );

      if (review.codeQuality?.comments?.length > 0) {
        review.codeQuality.comments.forEach(
          (comment) => {
            addText(`• ${comment}`);
          }
        );
      } else {
        addText(
          "No code quality comments available."
        );
      }

      // =========================
      // SECURITY
      // =========================

      addHeading("Security");

      if (review.securityIssues?.length > 0) {
        review.securityIssues.forEach((issue) => {
          addText(`• ${issue}`);
        });
      } else {
        addText("No security issues detected.");
      }

      // =========================
      // SUGGESTIONS
      // =========================

      addHeading("Suggestions");

      if (review.suggestions?.length > 0) {
        review.suggestions.forEach((suggestion) => {
          addText(`• ${suggestion}`);
        });
      } else {
        addText("No suggestions available.");
      }

      // =========================
      // IMPROVED CODE
      // =========================

      addHeading("Improved Code");

      addText(
        review.improvedCode ||
          "No improved code available.",
        "courier"
      );

      // =========================
      // DOWNLOAD
      // =========================

      doc.save("code-review-report.pdf");

      toast.success("Review report downloaded");
    } catch (error) {
      console.error(
        "PDF download failed:",
        error
      );

      toast.error(
        "Failed to download review report"
      );
    }
  };

  return (
    <button
      onClick={handleDownload}
      title="Download Review"
      aria-label="Download Review"
      className="flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-colors cursor-pointer"
    >
      <FontAwesomeIcon
        icon={faDownload}
        className="h-4 w-4"
      />
    </button>
  );
};

export default DownloadReview;