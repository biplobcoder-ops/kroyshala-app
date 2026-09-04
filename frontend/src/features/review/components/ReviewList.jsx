import React from "react";
import { FiStar, FiMessageSquare } from "react-icons/fi";

import ReviewCard from "./ReviewCard";

// ==========================================
// Review List Component
// ==========================================

const ReviewList = ({
  reviews,
  loading,
  currentUserId,
  onEdit,
  onDelete,
  deleting,
}) => {
  // ==========================================
  // Loading State
  // ==========================================

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl bg-slate-100 p-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-3 w-20 rounded bg-slate-200" />
              </div>
            </div>
            <div className="mt-3 h-4 w-full rounded bg-slate-200" />
            <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  // ==========================================
  // Empty State
  // ==========================================

  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <FiMessageSquare className="h-7 w-7 text-slate-400" />
        </div>
        <p className="font-semibold text-slate-600">
          No Reviews Yet
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Be the first to review this product
        </p>
      </div>
    );
  }

  // ==========================================
  // Average Rating
  // ==========================================

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) /
    reviews.length;

  return (
    <div>
      {/* Summary */}
      <div className="mb-4 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-slate-900">
            {averageRating.toFixed(1)}
          </p>
          <div className="flex items-center justify-center">
            <FiStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-900">
            {reviews.length} Reviews
          </p>
          <p className="text-sm text-slate-500">
            Based on verified purchases
          </p>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            currentUserId={currentUserId}
            onEdit={onEdit}
            onDelete={onDelete}
            deleting={deleting}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;