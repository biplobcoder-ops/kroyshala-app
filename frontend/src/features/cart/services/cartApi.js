import api from "../../../services/api";

// ==========================================
// Cart API Service
// ==========================================

const cartApi = {
  // ==========================================
  // Get Cart (Logged In)
  // GET /api/cart
  // ==========================================

  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  // ==========================================
  // Add To Cart (Logged In)
  // POST /api/cart/add
  // Body: { productId, quantity }
  // ==========================================

  addToCart: async (productId, quantity = 1) => {
    const response = await api.post("/cart/add", {
      productId,
      quantity,
    });
    return response.data;
  },

  // ==========================================
  // Update Cart Quantity (Logged In)
  // PUT /api/cart/update
  // Body: { productId, quantity }
  // ==========================================

  updateCartQuantity: async (productId, quantity) => {
    const response = await api.put("/cart/update", {
      productId,
      quantity,
    });
    return response.data;
  },

  // ==========================================
  // Remove From Cart (Logged In)
  // DELETE /api/cart/remove/:productId
  // ==========================================

  removeFromCart: async (productId) => {
    const response = await api.delete(
      `/cart/remove/${productId}`
    );
    return response.data;
  },
};

export default cartApi;