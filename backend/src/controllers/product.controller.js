const {
  createProductService,
  getProductsService,
  getProductFiltersService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
} = require("../services/product.service");
const successResponse = require("../utils/successResponse");

// ==========================================
// Create Product Controller
// ==========================================

const handleCreateProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const files = req.files;

    const result = await createProductService(productData, files);

    return successResponse(res, {
      statusCode: 201,
      message: "Product created successfully.",
      payload: { product: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get All Products Controller
// ==========================================

const handleGetProducts = async (req, res, next) => {
  try {
    const result = await getProductsService(req.query);

    return successResponse(res, {
      statusCode: 200,
      message: "Products fetched successfully.",
      payload: {
        products: result.products,
        total: result.total,
        page: result.page,
        pages: result.pages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get Product Filters Controller
// ==========================================

const handleGetProductFilters = async (req, res, next) => {
  try {
    const result = await getProductFiltersService();

    return successResponse(res, {
      statusCode: 200,
      message: "Product filters fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get Single Product Controller
// ==========================================

const handleGetSingleProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const result = await getSingleProductService(slug);

    return successResponse(res, {
      statusCode: 200,
      message: "Product fetched successfully.",
      payload: { product: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Update Product Controller
// ==========================================

const handleUpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const files = req.files;

    const result = await updateProductService(id, updateData, files);

    return successResponse(res, {
      statusCode: 200,
      message: "Product updated successfully.",
      payload: { product: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Delete Product Controller
// ==========================================

const handleDeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductService(id);

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateProduct,
  handleGetProducts,
  handleGetProductFilters,
  handleGetSingleProduct,
  handleUpdateProduct,
  handleDeleteProduct,
};