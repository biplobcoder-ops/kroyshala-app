import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "../services/orderApi";

// ==========================================
// Initial State
// ==========================================

const initialState = {
  orders: [],
  singleOrder: null,
  loading: false,
  error: null,
};

// ==========================================
// Async Thunks
// ==========================================

// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await orderApi.createOrder(orderData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

// Get My Orders
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await orderApi.getMyOrders();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// Get Single Order
export const getSingleOrder = createAsyncThunk(
  "order/getSingleOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await orderApi.getSingleOrder(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order"
      );
    }
  }
);

// Cancel Order
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await orderApi.cancelOrder(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel order"
      );
    }
  }
);

// Confirm Order
export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await orderApi.confirmOrder(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to confirm order"
      );
    }
  }
);

// ==========================================
// Order Slice
// ==========================================

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },

    clearSingleOrder: (state) => {
      state.singleOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload?.payload?.order || null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.payload?.orders || [];
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Order
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload?.payload?.order || null;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload?.payload?.order || null;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Confirm Order
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload?.payload?.order || null;
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ==========================================
// Actions
// ==========================================

export const { clearOrderError, clearSingleOrder } = orderSlice.actions;

// ==========================================
// Reducer
// ==========================================

export default orderSlice.reducer;