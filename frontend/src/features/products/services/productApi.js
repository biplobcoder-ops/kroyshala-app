import api from "../../../services/api";

// ==========================================
// Product API Service
// ==========================================

const productApi = {
  // ==========================================
  // Get Product Filters
  // GET /api/products/filters
  // ==========================================

  getProductFilters: async () => {
    const response = await api.get("/products/filters");
    return response.data;
  },

  // ==========================================
  // Get All Products
  // GET /api/products?page=1&limit=10&search=&category=&minPrice=&maxPrice=&brand=&sort=
  // ==========================================

  getProducts: async (params = {}) => {
    const {
      page = 1,
      limit = 12,
      search = "",
      category = "",
      minPrice = "",
      maxPrice = "",
      brand = "",
      sort = "-createdAt",
    } = params;

    const query = new URLSearchParams();

    if (page) query.append("page", page);
    if (limit) query.append("limit", limit);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (brand) query.append("brand", brand);
    if (sort) query.append("sort", sort);

    const response = await api.get(`/products?${query.toString()}`);
    return response.data;
  },

  // ==========================================
  // Get Single Product
  // GET /api/products/:slug
  // ==========================================

  getProductBySlug: async (slug) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  },

  // ==========================================
  // Create Product (Admin)
  // POST /api/products
  // ==========================================

  createProduct: async (productData) => {
    const response = await api.post("/products", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // ==========================================
  // Update Product (Admin)
  // PUT /api/products/:id
  // ==========================================

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // ==========================================
  // Delete Product (Admin)
  // DELETE /api/products/:id
  // ==========================================

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export default productApi;