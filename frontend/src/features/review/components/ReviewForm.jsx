import React, { useState } from "react";
import { FiStar, FiSend } from "react-icons/fi";

import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import Textarea from "../../../components/ui/Textarea/Textarea";
import Alert from "../../../components/ui/Alert/Alert";

// ==========================================
// Review Form Component
// ==========================================

const ReviewForm = ({ onSubmit, submitting, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: initialData?.rating || 5,
    title: initialData?.title || "",
    comment: initialData?.comment || "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState("");

  // ==========================================
  // Handle Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  // ==========================================
  // Handle Rating Click
  // ==========================================

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
    setError("");
  };

  // ==========================================
  // Handle Submit
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.comment.trim()) {
      setError("Please write a review comment");
      return;
    }

    if (formData.rating < 1 || formData.rating > 5) {
      setError("Please select a rating");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        {initialData ? "Edit Review" : "Write a Review"}
      </h3>

      {error && (
        <div className="mb-4">
          <Alert variant="error" title="Validation Error">
            {error}
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ==========================================
            Star Rating
        ========================================== */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Rating
          </label>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              const starValue = index + 1;
              const isFilled =
                starValue <= (hoverRating || formData.rating);

              return (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => handleRatingClick(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <FiStar
                    className={`
                      h-8
                      w-8

                      ${
                        isFilled
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }
                    `}
                  />
                </button>
              );
            })}

            <span className="ml-2 text-sm font-medium text-slate-600">
              {hoverRating || formData.rating} / 5
            </span>
          </div>
        </div>

        {/* ==========================================
            Title
        ========================================== */}

        <Input
          label="Title (Optional)"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Summary of your review"
          disabled={submitting}
          fullWidth
        />

        {/* ==========================================
            Comment
        ========================================== */}

        <Textarea
          label="Review"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Share your experience with this product..."
          disabled={submitting}
          required
          fullWidth
          rows={4}
        />

        {/* ==========================================
            Buttons
        ========================================== */}

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            leftIcon={<FiSend />}
            loading={submitting}
            disabled={submitting}
          >
            {initialData ? "Update Review" : "Submit Review"}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;