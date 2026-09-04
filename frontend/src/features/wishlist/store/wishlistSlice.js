import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistApi from "../services/wishlistApi";

// ==========================================
// Initial State
// ==========================================

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// ==========================================
// Async Thunks
// ==========================================

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await wishlistApi.getWishlist();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await wishlistApi.addToWishlist(productId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await wishlistApi.removeFromWishlist(productId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);

// ==========================================
// Wishlist Slice
// ==========================================

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
    },

    clearWishlistError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // Backend returns: payload.wishlist.products (populated array)
        const wishlist = action.payload?.payload?.wishlist;
        state.items = wishlist?.products || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add To Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const wishlist = action.payload?.payload?.wishlist;
        state.items = wishlist?.products || [];
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove From Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const wishlist = action.payload?.payload?.wishlist;
        state.items = wishlist?.products || [];
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlist, clearWishlistError } = wishlistSlice.actions;

export default wishlistSlice.reducer;