import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardApi from "../services/dashboardApi";

const initialState = {
  overview: null,
  monthlySales: [],
  revenueStats: null,
  orderStatusAnalytics: [],
  revenueAnalytics: [],
  productPerformance: [],
  orderStats: null,
  salesAnalytics: [],
  customerAnalytics: null,
  orders: [],
  users: [],
  selectedOrder: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  userPagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

// ==========================================
// Dashboard Overview
// ==========================================
export const fetchDashboardOverview = createAsyncThunk(
  "dashboard/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getOverview();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load dashboard");
    }
  }
);

// ==========================================
// Monthly Sales
// ==========================================
export const fetchMonthlySales = createAsyncThunk(
  "dashboard/fetchMonthlySales",
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getMonthlySales();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load monthly sales");
    }
  }
);

// ==========================================
// Revenue Statistics
// ==========================================
export const fetchRevenueStatistics = createAsyncThunk(
  "dashboard/fetchRevenueStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getRevenueStatistics();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load revenue statistics");
    }
  }
);

// ==========================================
// Revenue Analytics
// ==========================================
export const fetchRevenueAnalytics = createAsyncThunk(
  "dashboard/fetchRevenueAnalytics",
  async (period = "month", { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getRevenueAnalytics(period);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load revenue analytics");
    }
  }
);

// ==========================================
// Order Status Analytics
// ==========================================
export const fetchOrderStatusAnalytics = createAsyncThunk(
  "dashboard/fetchOrderStatusAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getOrderStatusAnalytics();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load order status analytics");
    }
  }
);

// ==========================================
// Product Performance
// ==========================================
export const fetchProductPerformance = createAsyncThunk(
  "dashboard/fetchProductPerformance",
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getProductPerformance();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load product performance");
    }
  }
);

// ==========================================
// Order Statistics
// ==========================================
export const fetchOrderStatistics = createAsyncThunk(
  "dashboard/fetchOrderStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getOrderStatistics();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load order statistics");
    }
  }
);

// ==========================================
// Sales Analytics
// ==========================================
export const fetchSalesAnalytics = createAsyncThunk(
  "dashboard/fetchSalesAnalytics",
  async (period = "month", { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getSalesAnalytics(period);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load sales analytics");
    }
  }
);

// ==========================================
// Customer Analytics
// ==========================================
export const fetchCustomerAnalytics = createAsyncThunk(
  "dashboard/fetchCustomerAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getCustomerAnalytics();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load customer analytics");
    }
  }
);

// ==========================================
// Orders
// ==========================================
export const getAllOrders = createAsyncThunk(
  "dashboard/getAllOrders",
  async (params, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getAllOrders(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load orders");
    }
  }
);

export const fetchSingleOrder = createAsyncThunk(
  "dashboard/fetchSingleOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getSingleOrder(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch order");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "dashboard/updateOrderStatus",
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.updateOrderStatus(orderId, orderStatus);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update status");
    }
  }
);

export const bulkUpdateOrderStatus = createAsyncThunk(
  "dashboard/bulkUpdateOrderStatus",
  async ({ orderIds, orderStatus }, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.bulkUpdateOrderStatus(orderIds, orderStatus);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update orders");
    }
  }
);

// ==========================================
// Users
// ==========================================
export const getAllUsers = createAsyncThunk(
  "dashboard/getAllUsers",
  async (params, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getAllUsers(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load users");
    }
  }
);

export const banUser = createAsyncThunk(
  "dashboard/banUser",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.banUser(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to ban user");
    }
  }
);

export const unbanUser = createAsyncThunk(
  "dashboard/unbanUser",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.unbanUser(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to unban user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "dashboard/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.deleteUser(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Overview
      .addCase(fetchDashboardOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload?.payload || action.payload;
      })
      .addCase(fetchDashboardOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Monthly Sales
      .addCase(fetchMonthlySales.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthlySales.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlySales = action.payload?.payload || action.payload || [];
      })
      .addCase(fetchMonthlySales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Revenue Statistics
      .addCase(fetchRevenueStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRevenueStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.revenueStats = action.payload?.payload || action.payload;
      })
      .addCase(fetchRevenueStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Revenue Analytics
      .addCase(fetchRevenueAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRevenueAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.revenueAnalytics = action.payload?.payload || action.payload || [];
      })
      .addCase(fetchRevenueAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Order Status Analytics
      .addCase(fetchOrderStatusAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderStatusAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.orderStatusAnalytics = action.payload?.payload || action.payload || [];
      })
      .addCase(fetchOrderStatusAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Product Performance
      .addCase(fetchProductPerformance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductPerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.productPerformance = action.payload?.payload || action.payload || [];
      })
      .addCase(fetchProductPerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Order Statistics
      .addCase(fetchOrderStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.orderStats = action.payload?.payload || action.payload;
      })
      .addCase(fetchOrderStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sales Analytics
      .addCase(fetchSalesAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSalesAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.salesAnalytics = action.payload?.payload || action.payload || [];
      })
      .addCase(fetchSalesAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Customer Analytics
      .addCase(fetchCustomerAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.customerAnalytics = action.payload?.payload || action.payload;
      })
      .addCase(fetchCustomerAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.payload || action.payload;
        state.orders = payload?.orders || [];
        state.pagination = {
          currentPage: payload?.page || 1,
          totalPages: payload?.pages || 1,
          totalItems: payload?.total || 0,
        };
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload?.payload?.order || null;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload?.payload?.order;
        if (updatedOrder) {
          const index = state.orders.findIndex((o) => o._id === updatedOrder._id);
          if (index !== -1) {
            state.orders[index] = updatedOrder;
          }
        }
      })

      .addCase(bulkUpdateOrderStatus.fulfilled, (state) => {})

      // Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.payload || action.payload;
        state.users = payload?.users || [];
        state.userPagination = {
          currentPage: payload?.page || 1,
          totalPages: payload?.pages || 1,
          totalItems: payload?.total || 0,
        };
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(banUser.fulfilled, (state, action) => {
        const bannedUser = action.payload?.payload?.user;
        if (bannedUser) {
          const index = state.users.findIndex((u) => u._id === bannedUser._id);
          if (index !== -1) {
            state.users[index] = bannedUser;
          }
        }
      })
      .addCase(unbanUser.fulfilled, (state, action) => {
        const unbannedUser = action.payload?.payload?.user;
        if (unbannedUser) {
          const index = state.users.findIndex((u) => u._id === unbannedUser._id);
          if (index !== -1) {
            state.users[index] = unbannedUser;
          }
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.users = state.users.filter((u) => u._id !== deletedId);
      });
  },
});

export const { clearDashboardError, clearSelectedOrder } = dashboardSlice.actions;
export default dashboardSlice.reducer;