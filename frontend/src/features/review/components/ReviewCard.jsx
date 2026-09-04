import React, { useState } from "react";
import {
  FiStar,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

import Button from "../../../components/ui/Button/Button";
import Avatar from "../../../components/ui/Avatar/Avatar";
import Badge from "../../../components/ui/Badge/Badge";

// ==========================================
// Review Card Component
// ==========================================

const ReviewCard = ({ review, currentUserId, onEdit, onDelete, deleting }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if current user is owner
  const isOwner = currentUserId === review.user?._id;

  // Format date
  const formattedDate = new Date(review.createdAt).toLocaleDateString(
    "en-BD",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  // Truncate comment
  const shouldTruncate = review.comment?.length > 200;
  const displayComment =
    shouldTruncate && !isExpanded
      ? `${review.comment.slice(0, 200)}...`
      : review.comment;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      {/* ==========================================
          Review Header
      ========================================== */}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar
            src={review.user?.image?.url || ""}
            name={review.user?.name || "User"}
            size="sm"
            rounded="full"
            border
          />

          <div>
            <p className="font-semibold text-slate-900">
              {review.user?.name || "Anonymous"}
            </p>

            <div className="flex items-center gap-2">
              {/* Star Rating */}
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FiStar
                    key={index}
                    className={`
                      h-4 w-4

                      ${
                        index < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }
                    `}
                  />
                ))}
              </div>

              <span className="text-xs text-slate-500">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Verified Purchase Badge */}
        {review.isVerifiedPurchase && (
          <Badge variant="success" size="sm">
            <FiCheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        )}
      </div>

      {/* ==========================================
          Review Title
      ========================================== */}

      {review.title && (
        <h3 className="mt-3 font-semibold text-slate-900">
          {review.title}
        </h3>
      )}

      {/* ==========================================
          Review Comment
      ========================================== */}

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {displayComment}
      </p>

      {/* Read More / Show Less */}
      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 text-sm font-medium text-blue-600 hover:underline"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}

      {/* ==========================================
          Owner Actions
      ========================================== */}

      {isOwner && (
        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={<FiEdit2 />}
            onClick={() => onEdit(review)}
          >
            Edit
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={<FiTrash2 />}
            onClick={() => onDelete(review._id)}
            disabled={deleting}
            className="!text-red-600 hover:!bg-red-50"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;