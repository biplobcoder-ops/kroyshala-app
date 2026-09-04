import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../services/productApi";

const initialState = {
  products: [],
  singleProduct: null,
  filterData: {
    brands: [],
    priceRange: { minPrice: 0, maxPrice: 100000 },
    categories: [],
  },
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
  },
  filters: {
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    brand: "",
    sort: "-createdAt",
  },
};

// ==========================================
// Fetch Product Filters
// ==========================================
export const fetchProductFilters = createAsyncThunk(
  "products/fetchProductFilters",
  async (_, { rejectWithValue }) => {
    try {
      const data = await productApi.getProductFilters();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch filters"
      );
    }
  }
);

// ==========================================
// Fetch Products
// ==========================================
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const data = await productApi.getProducts(params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// ==========================================
// Fetch Single Product
// ==========================================
export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const data = await productApi.getProductBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// ==========================================
// Create Product (Admin)
// ==========================================
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const data = await productApi.createProduct(productData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// ==========================================
// Update Product (Admin)
// ==========================================
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await productApi.updateProduct(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// ==========================================
// Delete Product (Admin)
// ==========================================
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productApi.deleteProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        brand: "",
        sort: "-createdAt",
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ==========================================
      // Fetch Product Filters
      // ==========================================
      .addCase(fetchProductFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.filterData = action.payload?.payload || state.filterData;
      })
      .addCase(fetchProductFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Fetch Products
      // ==========================================
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.payload || action.payload;
        state.products = payload.products || [];
        state.pagination = {
          page: payload.page || 1,
          pages: payload.pages || 1,
          total: payload.total || 0,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Fetch Single Product
      // ==========================================
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload?.payload?.product || null;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Create Product
      // ==========================================
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        const newProduct = action.payload?.payload?.product;
        if (newProduct) {
          state.products.unshift(newProduct);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Update Product
      // ==========================================
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload?.payload?.product;
        if (updatedProduct) {
          const index = state.products.findIndex((p) => p._id === updatedProduct._id);
          if (index !== -1) {
            state.products[index] = updatedProduct;
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Delete Product
      // ==========================================
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.products = state.products.filter((p) => p._id !== deletedId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearError } = productSlice.actions;
export default productSlice.reducer;