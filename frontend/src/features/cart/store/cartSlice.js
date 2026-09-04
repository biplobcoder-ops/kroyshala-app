import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../services/cartApi";

const initialState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await cartApi.getCart();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = await cartApi.addToCart(productId, quantity);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = await cartApi.updateCartQuantity(productId, quantity);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await cartApi.removeFromCart(productId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  }
);

// Helper for safe access
const getCartData = (payload) => {
  const cart = payload?.payload?.cart || payload?.cart || null;
  return {
    items: cart?.items || [],
    totalPrice: cart?.totalPrice || 0,
    totalItems: cart?.totalItems || 0,
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
      state.error = null;
    },
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        const cart = getCartData(action.payload);
        state.items = cart.items;
        state.totalPrice = cart.totalPrice;
        state.totalItems = cart.totalItems;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const cart = getCartData(action.payload);
        state.items = cart.items;
        state.totalPrice = cart.totalPrice;
        state.totalItems = cart.totalItems;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const cart = getCartData(action.payload);
        state.items = cart.items;
        state.totalPrice = cart.totalPrice;
        state.totalItems = cart.totalItems;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const cart = getCartData(action.payload);
        state.items = cart.items;
        state.totalPrice = cart.totalPrice;
        state.totalItems = cart.totalItems;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart, clearCartError } = cartSlice.actions;
export default cartSlice.reducer;