import React from "react";

const ReviewShimmer = () => {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Overall Assessment */}
      <section>
        <div className="mb-3 h-4 w-40 rounded bg-gray-300 dark:bg-gray-700" />

        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-[95%] rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-[80%] rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </section>

      <div className="h-px bg-blue-500/20" />

      {/* Bugs */}
      <section>
        <div className="mb-3 h-4 w-20 rounded bg-gray-300 dark:bg-gray-700" />

        <div className="rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800/40 p-4">
          <div className="mb-3 h-4 w-48 rounded bg-gray-300 dark:bg-gray-700" />

          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-[85%] rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </section>

      <div className="h-px bg-blue-500/20" />

      {/* Complexity */}
      <section>
        <div className="mb-3 h-4 w-28 rounded bg-gray-300 dark:bg-gray-700" />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800/40 p-4">
            <div className="mb-2 h-3 w-24 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800/40 p-4">
            <div className="mb-2 h-3 w-24 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-[75%] rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </section>

      <div className="h-px bg-blue-500/20" />

      {/* Code Quality */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-5 w-12 rounded bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-[90%] rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-[75%] rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-[85%] rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </section>

      <div className="h-px bg-blue-500/20" />

      {/* Security */}
      <section>
        <div className="mb-3 h-4 w-24 rounded bg-gray-300 dark:bg-gray-700" />

        <div className="h-3 w-[70%] rounded bg-gray-200 dark:bg-gray-800" />
      </section>

      <div className="h-px bg-blue-500/20" />

      {/* Suggestions */}
      <section>
        <div className="mb-3 h-4 w-28 rounded bg-gray-300 dark:bg-gray-700" />

        <div className="space-y-2">
          <div className="h-3 w-[90%] rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-[80%] rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-[65%] rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </section>

      <div className="h-px bg-blue-500/20" />

      {/* Improved Code */}
      <section>
        <div className="mb-3 h-4 w-32 rounded bg-gray-300 dark:bg-gray-700" />

        <div className="h-40 w-full rounded-lg border border-gray-300 bg-gray-200 dark:border-gray-800 dark:bg-gray-950" />
      </section>

    </div>
  );
};

export default ReviewShimmer;