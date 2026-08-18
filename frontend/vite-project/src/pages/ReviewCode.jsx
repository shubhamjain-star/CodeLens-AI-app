
import EditorShimmer from "../components/reviewer/EditorShimmer";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faCopy} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
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
  const [retryMessage, setRetryMessage] = useState("");

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(defaultCode[newLanguage]);
    setReview(null);
  };
  const handleCopyCode = async () => {
  try {
    await navigator.clipboard.writeText(code || "");

    toast.success("Code copied to clipboard");
  } catch (error) {
    console.error("Copy failed:", error);
    toast.error("Failed to copy code");
  }
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const handleReview = async () => {
  // 1. Check if code is empty
  if (!code.trim()) {
    alert("Please write some code first.");
    return;
  }

  // 2. Check authentication
  if (!isAuthenticated) {
    navigate("/login");
    return;
  }

  // Retry delays: 10 sec → 20 sec → 25 sec
  const retryDelays = [10000, 20000, 25000];

  try {
    setLoading(true);
    setRetryMessage("");

    let response;

    // Initial request + 3 retries
    for (let attempt = 0; attempt <= retryDelays.length; attempt++) {
      try {
        // Send request
        response = await reviewCode(code, language);

        // Request successful → stop retrying
        break;

      } catch (error) {
        console.error(`Review attempt ${attempt + 1} failed:`, error);

        // Handle authentication error immediately
        if (error.response?.status === 401) {
          alert("Your session has expired. Please login again.");
          navigate("/login");
          return;
        }

        // Handle daily limit immediately
        if (error.response?.status === 429) {
          alert(
            error.response?.data?.message ||
            "You have reached your daily review limit."
          );
          return;
        }

        // Only retry 503 errors
        if (error.response?.status !== 503) {
          throw error;
        }

        // No more retries available
        if (attempt === retryDelays.length) {
          throw error;
        }

        // Get current retry delay
        const delayTime = retryDelays[attempt];
        const seconds = delayTime / 1000;

        setRetryMessage(
          `AI model is currently busy. Retrying in ${seconds} seconds...`
        );

        // Wait before retrying
        await delay(delayTime);

        // Clear message before retry
        setRetryMessage("");
      }
    }

    console.log("Gemini Review Response:", response);

    // Set successful review
    setReview(response.review);

  } catch (error) {
    console.error("Review error:", error);

    // Gemini still unavailable after all retries
    if (error.response?.status === 503) {
      toast.error(
        "AI service is temporarily unavailable. Gemini is currently experiencing high demand. Please try again later.",
        {
          autoClose: 6000,
        }
      );

      return;
    }

    // Other errors
    toast.error(
      error.response?.data?.message ||
      "Failed to review code"
    );

  } finally {
    setLoading(false);
    setRetryMessage("");
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

               {/* Copy Code button */}
  <button
    onClick={handleCopyCode}
    className="flex items-center gap-2 rounded-md p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition"
    title="Copy Code"
    aria-label="Copy Code"
  >
    <FontAwesomeIcon
      icon={faCopy}
      className="h-4 w-4"
    />
  </button> 
            {/* Reset Button */}
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

              <div className="flex flex-col gap-1">
                 <span className="text-xs font-medium text-gray-600 dark:text-gray-500">
                  {code.length} characters
              </span>

    {retryMessage && (
      <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
        {retryMessage}
      </span>
    )}
  </div>

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
