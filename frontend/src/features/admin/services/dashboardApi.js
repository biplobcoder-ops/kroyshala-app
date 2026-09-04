import api from "../../../services/api";

const dashboardApi = {
  // Dashboard
  getOverview: async () => {
    const response = await api.get("/dashboard/overview");
    return response.data;
  },

  // Monthly Sales
  getMonthlySales: async () => {
    const response = await api.get("/dashboard/monthly-sales");
    return response.data;
  },

  // Revenue Statistics
  getRevenueStatistics: async () => {
    const response = await api.get("/dashboard/revenue-statistics");
    return response.data;
  },

  // Revenue Analytics
  getRevenueAnalytics: async (period = "month") => {
    const response = await api.get(`/dashboard/revenue-analytics?period=${period}`);
    return response.data;
  },

  // Order Status Analytics
  getOrderStatusAnalytics: async () => {
    const response = await api.get("/dashboard/order-status-analytics");
    return response.data;
  },

  // Product Performance
  getProductPerformance: async () => {
    const response = await api.get("/dashboard/product-performance");
    return response.data;
  },

  // Order Statistics
  getOrderStatistics: async () => {
    const response = await api.get("/dashboard/order-statistics");
    return response.data;
  },

  // Sales Analytics
  getSalesAnalytics: async (period = "month") => {
    const response = await api.get(`/dashboard/sales-analytics?period=${period}`);
    return response.data;
  },

  // Customer Analytics
  getCustomerAnalytics: async () => {
    const response = await api.get("/dashboard/customer-analytics");
    return response.data;
  },

  // Orders
  getAllOrders: async (params = {}) => {
    const { page = 1, limit = 10, orderStatus = "" } = params;
    const query = new URLSearchParams();
    if (page) query.append("page", page);
    if (limit) query.append("limit", limit);
    if (orderStatus) query.append("orderStatus", orderStatus);
    const response = await api.get(`/orders/admin/all?${query.toString()}`);
    return response.data;
  },

  getSingleOrder: async (orderId) => {
    const response = await api.get(`/orders/admin/${orderId}`);
    return response.data;
  },

  updateOrderStatus: async (orderId, orderStatus) => {
    const response = await api.put(`/orders/admin/${orderId}/status`, { orderStatus });
    return response.data;
  },

  bulkUpdateOrderStatus: async (orderIds, orderStatus) => {
    const response = await api.put("/orders/admin/bulk-status", {
      orderIds,
      orderStatus,
    });
    return response.data;
  },

  // Users
  getAllUsers: async (params = {}) => {
    const { page = 1, limit = 10, search = "" } = params;
    const query = new URLSearchParams();
    if (page) query.append("page", page);
    if (limit) query.append("limit", limit);
    if (search) query.append("search", search);
    const response = await api.get(`/dashboard/users?${query.toString()}`);
    return response.data;
  },

  banUser: async (userId) => {
    const response = await api.put(`/dashboard/users/${userId}/ban`);
    return response.data;
  },

  unbanUser: async (userId) => {
    const response = await api.put(`/dashboard/users/${userId}/unban`);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/dashboard/users/${userId}`);
    return response.data;
  },
};

export default dashboardApi;