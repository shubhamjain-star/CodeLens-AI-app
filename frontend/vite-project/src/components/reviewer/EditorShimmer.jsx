
const EditorShimmer = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1e1e1e] p-5">
      <div className="space-y-4">

        {/* Line 1 */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-6 animate-pulse rounded bg-gray-700" />
          <div className="h-4 w-[70%] animate-pulse rounded bg-gray-700" />
        </div>

        {/* Line 2 */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-6 animate-pulse rounded bg-gray-700" />
          <div className="h-4 w-[55%] animate-pulse rounded bg-gray-700" />
        </div>

        {/* Line 3 */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-6 animate-pulse rounded bg-gray-700" />
          <div className="h-4 w-[80%] animate-pulse rounded bg-gray-700" />
        </div>

        {/* Line 4 */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-6 animate-pulse rounded bg-gray-700" />
          <div className="h-4 w-[45%] animate-pulse rounded bg-gray-700" />
        </div>

        {/* Line 5 */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-6 animate-pulse rounded bg-gray-700" />
          <div className="h-4 w-[65%] animate-pulse rounded bg-gray-700" />
        </div>

        {/* Line 6 */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-6 animate-pulse rounded bg-gray-700" />
          <div className="h-4 w-[35%] animate-pulse rounded bg-gray-700" />
        </div>

      </div>
    </div>
  );
};

export default EditorShimmer;