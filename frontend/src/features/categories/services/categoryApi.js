import api from "../../../services/api";

const categoryApi = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },

  // Get single category
  getCategoryBySlug: async (slug) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },

  // Create category (Admin)
  createCategory: async (categoryData) => {
    const response = await api.post("/categories", categoryData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update category (Admin)
  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete category (Admin)
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

export default categoryApi;