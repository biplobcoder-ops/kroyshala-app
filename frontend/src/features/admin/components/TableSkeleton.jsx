import React from "react";

// ==========================================
// Table Skeleton Loader
// ==========================================

const TableSkeleton = ({ rows = 5, columns = 6 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-center gap-4 rounded-xl bg-slate-100 p-4 animate-pulse"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`h-4 rounded bg-slate-200 ${
                colIndex === 0 ? "w-10" : colIndex === 1 ? "flex-1" : "w-24"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;