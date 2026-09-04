import api from "../../../services/api";

// ==========================================
// Wishlist API Service
// ==========================================

const wishlistApi = {
  // Get Wishlist
  getWishlist: async () => {
    const response = await api.get("/wishlist");
    return response.data;
  },

  // Add To Wishlist
  addToWishlist: async (productId) => {
    const response = await api.post("/wishlist/add", {
      productId,
    });
    return response.data;
  },

  // Remove From Wishlist
  removeFromWishlist: async (productId) => {
    const response = await api.delete(`/wishlist/remove/${productId}`);
    return response.data;
  },
};

export default wishlistApi;