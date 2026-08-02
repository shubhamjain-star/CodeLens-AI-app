
import EditorShimmer from "../components/reviewer/EditorShimmer";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CodeEditor from "../components/reviewer/CodeEditor";
import LanguageSelector from "../components/reviewer/LanguageSelector";
import ReviewPanel from "../components/reviewer/ReviewPanel";

import { reviewCode } from "../services/reviewService";
import { defaultCode } from "../data/defaultCode";
import { reviewCodeContent } from "../data/content";

const ReviewCode = () => {
  const navigate = useNavigate();

  // Get authentication state from Redux
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(defaultCode.java);
  const [editorLoading, setEditorLoading] = useState(true);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(defaultCode[newLanguage]);
    setReview(null);
  };

  const handleReview = async () => {
    // 1. Check if code is empty
    if (!code.trim()) {
      alert("Please write some code first.");
      return;
    }

    // 2. Check authentication
    if (!isAuthenticated) {
      // User is not logged in
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // 3. Send request
      // JWT will automatically be attached
      // by the Axios interceptor in api.js
      const response = await reviewCode(code, language);

      console.log("Gemini Review Response:", response);

      // 4. Set review result
      setReview(response.review);

    } catch (error) {
      console.error("Review error:", error);

      // 401 = JWT missing/invalid/expired
      if (error.response?.status === 401) {
        alert("Your session has expired. Please login again.");

        navigate("/login");
        return;
      }

      // 429 = daily request limit reached
      if (error.response?.status === 429) {
        alert(
          error.response?.data?.message ||
          "You have reached your daily review limit."
        );
        return;
      }

      alert(
        error.response?.data?.message ||
        "Failed to review code"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      {/* Page Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-lg font-bold text-gray-950 dark:text-white sm:text-xl md:text-2xl">
              {reviewCodeContent.header.subtitle}
            </h1>
          </div>

          <div className="w-full sm:w-auto">
            <LanguageSelector
              language={language}
              setLanguage={handleLanguageChange}
            />
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* LEFT SIDE - CODE EDITOR */}
          <section className="flex min-h-[450px] sm:min-h-[550px] lg:min-h-[600px] flex-col overflow-hidden rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md dark:shadow-none">

            {/* Editor Top Bar */}
            <div className="flex items-center justify-end border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-3">

              <button
                onClick={() => {
                  setCode(defaultCode[language]);
                  setReview(null);
                }}
                className="flex items-center gap-2 rounded-md p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition"
                title="Reset Code"
                aria-label="Reset Code"
              >
                <FontAwesomeIcon
                  icon={faRotateRight}
                  className="h-4 w-4"
                />
              </button>

            </div>

            {/* Monaco Editor Container */}
            <div className="relative min-h-0 flex-1">

              <CodeEditor
                language={language}
                code={code}
                setCode={setCode}
                onEditorReady={() => setEditorLoading(false)}
              />

              {editorLoading && (
                <div className="absolute inset-0 z-10">
                  <EditorShimmer />
                </div>
              )}

            </div>

            {/* Editor Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-3">

              <span className="text-xs font-medium text-gray-600 dark:text-gray-500">
                {code.length} characters
              </span>

              <button
                onClick={handleReview}
                disabled={loading}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:text-sm"
              >
                {loading ? "Reviewing..." : "Review Code"}
              </button>

            </div>

          </section>

          {/* RIGHT SIDE - REVIEW PANEL */}
          <section className="flex min-h-[450px] sm:min-h-[550px] lg:min-h-[600px] flex-col overflow-hidden rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md dark:shadow-none">

            <ReviewPanel
              review={review}
              loading={loading}
            />

          </section>

        </div>

      </main>

    </div>
  );
};

export default ReviewCode;
