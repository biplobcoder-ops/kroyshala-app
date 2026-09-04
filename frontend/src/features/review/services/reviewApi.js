import api from "../../../services/api";

const reviewApi = {
  // Get reviews for a product
  getProductReviews: async (productId) => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  },

  // Create review
  createReview: async (reviewData) => {
    const response = await api.post("/reviews/create", reviewData);
    return response.data;
  },

  // Update review
  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  // Delete review
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },
};

export default reviewApi;