import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewApi from "../services/reviewApi";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  submitting: false,
};

export const getProductReviews = createAsyncThunk(
  "review/getProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await reviewApi.getProductReviews(productId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

export const createReview = createAsyncThunk(
  "review/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const data = await reviewApi.createReview(reviewData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create review"
      );
    }
  }
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const data = await reviewApi.updateReview(reviewId, reviewData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update review"
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const data = await reviewApi.deleteReview(reviewId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get product reviews
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload?.payload?.reviews || [];
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create review
      .addCase(createReview.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.submitting = false;
        const newReview = action.payload?.payload?.review;
        if (newReview) {
          state.reviews.unshift(newReview);
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // Update review
      .addCase(updateReview.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.submitting = false;
        const updatedReview = action.payload?.payload?.review;
        if (updatedReview) {
          const index = state.reviews.findIndex(
            (review) => review._id === updatedReview._id
          );
          if (index !== -1) {
            state.reviews[index] = updatedReview;
          }
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // Delete review
      .addCase(deleteReview.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.submitting = false;
        const reviewId = action.meta.arg;
        state.reviews = state.reviews.filter((review) => review._id !== reviewId);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewError, clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;