import React from "react";

import { staticReviewContent } from "../../data/content";
import ReviewShimmer from "./ReviewShimmer";
import CopyReview from "./CopyReview";
import DownloadReview from "./DownloadReview";

const ReviewPanel = ({ review, loading = false }) => {
  const { header, loadingState, sectionTitles } =
    staticReviewContent;

  return (
    <div className="h-full overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 text-gray-800 dark:text-white transition-colors duration-300">

      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">

        {/* Header Content */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            {header.title}
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {header.subtitle}
          </p>
        </div>

        {/* Review Actions */}
        {!loading && review && (
          <div className="flex items-center gap-2">

            <CopyReview review={review} />

            <DownloadReview review={review} />

          </div>
        )}

      </div>

      {/* Loading State */}
      {loading && <ReviewShimmer />}

      {/* Empty State */}
      {!loading && !review && (
        <div className="flex min-h-[300px] items-center justify-center text-center">
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-400">
              {loadingState.title}
            </p>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              {loadingState.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Review Results */}
      {!loading && review && (
        <div className="space-y-5">

          {/* Divider */}
          <hr className="border-blue-500/30 dark:border-blue-500/40" />

          {/* Overall Assessment */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              {sectionTitles.assessment}
            </h3>

            <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
              {review.summary || "No summary available."}
            </p>
          </section>

          {/* Divider */}
          <hr className="border-blue-500/30 dark:border-blue-500/40" />

          {/* Bugs */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {sectionTitles.bugs}
              </h3>

              <span className="rounded-full border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:border-transparent dark:bg-gray-800 dark:text-gray-400">
                {review.bugs?.length || 0}
              </span>
            </div>

            {review.bugs?.length > 0 ? (
              <div className="space-y-3">
                {review.bugs.map((bug, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {bug.title}
                      </h4>

                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold capitalize text-red-600 dark:bg-red-500/10 dark:text-red-400">
                        {bug.severity}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {bug.description}
                    </p>

                    {bug.line && (
                      <p className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-500">
                        Line: {bug.line}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No bugs detected.
              </p>
            )}
          </section>

          {/* Divider */}
          <hr className="border-blue-500/30 dark:border-blue-500/40" />

          {/* Complexity */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
              {sectionTitles.complexity}
            </h3>

            <div className="grid grid-cols-2 gap-3">

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
                  Time Complexity
                </p>

                <p className="mt-1 font-mono text-sm font-semibold text-blue-700 dark:text-blue-300">
                  {review.complexity?.time || "N/A"}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
                  Space Complexity
                </p>

                <p className="mt-1 font-mono text-sm font-semibold text-blue-700 dark:text-blue-300">
                  {review.complexity?.space || "N/A"}
                </p>
              </div>

            </div>

            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {review.complexity?.explanation ||
                "No explanation available."}
            </p>
          </section>

          {/* Divider */}
          <hr className="border-blue-500/30 dark:border-blue-500/40" />

          {/* Code Quality */}
          <section>
            <div className="mb-3 flex items-center justify-between">

              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {sectionTitles.codeQuality}
              </h3>

              <span className="font-semibold text-blue-700 dark:text-blue-300">
                {review.codeQuality?.score ?? 0}/10
              </span>

            </div>

            {review.codeQuality?.comments?.length > 0 ? (
              <ul className="space-y-2">
                {review.codeQuality.comments.map(
                  (comment, index) => (
                    <li
                      key={index}
                      className="text-sm leading-6 text-gray-700 dark:text-gray-300"
                    >
                      <span className="mr-2 text-blue-600 dark:text-blue-400">
                        •
                      </span>

                      {comment}
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No code quality comments available.
              </p>
            )}
          </section>

          {/* Divider */}
          <hr className="border-blue-500/30 dark:border-blue-500/40" />

          {/* Security */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              {sectionTitles.security}
            </h3>

            {review.securityIssues?.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                {review.securityIssues.map(
                  (issue, index) => (
                    <li key={index}>{issue}</li>
                  )
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No security issues detected.
              </p>
            )}
          </section>

          {/* Divider */}
          <hr className="border-blue-500/30 dark:border-blue-500/40" />

          {/* Suggestions */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              {sectionTitles.suggestions}
            </h3>

            {review.suggestions?.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                {review.suggestions.map(
                  (suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  )
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No suggestions available.
              </p>
            )}
          </section>

          {/* Divider */}
          <hr className="border-blue-500/30 dark:border-blue-500/40" />

          {/* Improved Code */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              {sectionTitles.improvedCode}
            </h3>

            <pre className="overflow-x-auto rounded-lg border border-gray-300 bg-gray-900 p-4 font-mono text-xs leading-6 text-blue-300 dark:border-gray-800 dark:bg-gray-950 dark:text-blue-200">
              <code>
                {review.improvedCode ||
                  "No improved code available."}
              </code>
            </pre>
          </section>

        </div>
      )}

    </div>
  );
};

export default ReviewPanel;