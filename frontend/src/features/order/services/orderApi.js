import api from "../../../services/api";

// ==========================================
// Order API Service
// ==========================================

const orderApi = {
  // ==========================================
  // Create Order (Logged In)
  // POST /api/orders/create
  // Body: { shippingAddress, paymentMethod }
  // ==========================================

  createOrder: async (orderData) => {
    const response = await api.post("/orders/create", orderData);
    return response.data;
  },

  // ==========================================
  // Get My Orders (Logged In)
  // GET /api/orders/my-orders
  // ==========================================

  getMyOrders: async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
  },

  // ==========================================
  // Get Single Order (Logged In)
  // GET /api/orders/:id
  // ==========================================

  getSingleOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // ==========================================
  // Cancel Order (Logged In)
  // PUT /api/orders/:id/cancel
  // ==========================================

  cancelOrder: async (orderId) => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data;
  },

  // ==========================================
  // Confirm Order (Logged In)
  // PUT /api/orders/:id/confirm
  // ==========================================

  confirmOrder: async (orderId) => {
    const response = await api.put(`/orders/${orderId}/confirm`);
    return response.data;
  },
};

export default orderApi;