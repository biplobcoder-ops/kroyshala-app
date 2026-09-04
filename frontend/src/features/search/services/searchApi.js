import api from "../../../services/api";

// ==========================================
// Search API Service
// ==========================================

const searchApi = {
  // ==========================================
  // Get Search Suggestions
  // GET /api/search/suggestions?query=searchTerm
  // ==========================================

  getSearchSuggestions: async (query) => {
    const response = await api.get(`/search/suggestions?query=${query}`);
    return response.data;
  },

  // ==========================================
  // Get Related Products
  // GET /api/search/related/:productId
  // ==========================================

  getRelatedProducts: async (productId) => {
    const response = await api.get(`/search/related/${productId}`);
    return response.data;
  },
};

export default searchApi;