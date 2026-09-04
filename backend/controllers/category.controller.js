const {
  createCategoryService,
  getCategoriesService,
  getSingleCategoryService,
  updateCategoryService,
  deleteCategoryService,
} = require("../services/category.service");
const successResponse = require("../utils/successResponse");

// ==========================================
// Create Category Controller
// ==========================================
const handleCreateCategory = async (req, res, next) => {
  try {
    const categoryData = req.body;
    const file = req.file;

    const result = await createCategoryService(categoryData, file);

    return successResponse(res, {
      statusCode: 201,
      message: "Category created successfully.",
      payload: { category: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get All Categories Controller
// ==========================================
const handleGetCategories = async (req, res, next) => {
  try {
    const result = await getCategoriesService();

    return successResponse(res, {
      statusCode: 200,
      message: "Categories fetched successfully.",
      payload: { categories: result, count: result.length },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get Single Category Controller
// ==========================================
const handleGetSingleCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const result = await getSingleCategoryService(slug);

    return successResponse(res, {
      statusCode: 200,
      message: "Category fetched successfully.",
      payload: { category: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Update Category Controller
// ==========================================
const handleUpdateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const file = req.file;

    const result = await updateCategoryService(id, updateData, file);

    return successResponse(res, {
      statusCode: 200,
      message: "Category updated successfully.",
      payload: { category: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Delete Category Controller
// ==========================================
const handleDeleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteCategoryService(id);

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateCategory,
  handleGetCategories,
  handleGetSingleCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};