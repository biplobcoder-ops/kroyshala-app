import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchApi from "../services/searchApi";

// ==========================================
// Initial State
// ==========================================

const initialState = {
  suggestions: {
    products: [],
    categories: [],
    brands: [],
    totalResults: 0,
  },
  relatedProducts: [],
  loading: false,
  error: null,
};

// ==========================================
// Async Thunks
// ==========================================

// Get Search Suggestions
export const getSearchSuggestions = createAsyncThunk(
  "search/getSearchSuggestions",
  async (query, { rejectWithValue }) => {
    try {
      const data = await searchApi.getSearchSuggestions(query);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get suggestions"
      );
    }
  }
);

// Get Related Products
export const getRelatedProducts = createAsyncThunk(
  "search/getRelatedProducts",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await searchApi.getRelatedProducts(productId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get related products"
      );
    }
  }
);

// ==========================================
// Search Slice
// ==========================================

const searchSlice = createSlice({
  name: "search",

  initialState,

  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = {
        products: [],
        categories: [],
        brands: [],
        totalResults: 0,
      };
    },

    clearSearchError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ==========================================
      // Get Search Suggestions
      // ==========================================

      .addCase(getSearchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload?.payload || initialState.suggestions;
      })
      .addCase(getSearchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Get Related Products
      // ==========================================

      .addCase(getRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts =
          action.payload?.payload?.relatedProducts || [];
      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ==========================================
// Actions
// ==========================================

export const { clearSuggestions, clearSearchError } = searchSlice.actions;

// ==========================================
// Reducer
// ==========================================

export default searchSlice.reducer;