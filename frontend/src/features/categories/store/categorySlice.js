import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "../services/categoryApi";

const initialState = {
  categories: [],
  singleCategory: null,
  loading: false,
  error: null,
};

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await categoryApi.getCategories();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
  }
);

// Fetch single category
export const fetchCategoryBySlug = createAsyncThunk(
  "categories/fetchCategoryBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const data = await categoryApi.getCategoryBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch category");
    }
  }
);

// Create category (Admin)
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const data = await categoryApi.createCategory(categoryData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create category");
    }
  }
);

// Update category (Admin)
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await categoryApi.updateCategory(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update category");
    }
  }
);

// Delete category (Admin)
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await categoryApi.deleteCategory(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete category");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.payload?.categories || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single
      .addCase(fetchCategoryBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCategory = action.payload?.payload?.category || null;
      })
      .addCase(fetchCategoryBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        const newCategory = action.payload?.payload?.category;
        if (newCategory) {
          state.categories.push(newCategory);
        }
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload?.payload?.category;
        if (updatedCategory) {
          const index = state.categories.findIndex((c) => c._id === updatedCategory._id);
          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.categories = state.categories.filter((c) => c._id !== deletedId);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategoryError } = categorySlice.actions;
export default categorySlice.reducer;