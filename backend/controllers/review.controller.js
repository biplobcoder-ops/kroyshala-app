const {
  createReviewService,
  getProductReviewsService,
  getSingleReviewService,
  updateReviewService,
  deleteReviewService,
} = require("../services/review.service");
const successResponse = require("../utils/successResponse");

// ==========================================
// Create Review Controller
// ==========================================
const handleCreateReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, rating, title, comment } = req.body;

    const result = await createReviewService(userId, productId, rating, title, comment);

    return successResponse(res, {
      statusCode: 201,
      message: "Review created successfully.",
      payload: { review: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get Product Reviews Controller
// ==========================================
const handleGetProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const result = await getProductReviewsService(productId);

    return successResponse(res, {
      statusCode: 200,
      message: "Product reviews fetched successfully.",
      payload: { reviews: result, count: result.length },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get Single Review Controller
// ==========================================
const handleGetSingleReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getSingleReviewService(id);

    return successResponse(res, {
      statusCode: 200,
      message: "Review fetched successfully.",
      payload: { review: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Update Review Controller
// ==========================================
const handleUpdateReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { rating, title, comment } = req.body;

    const result = await updateReviewService(userId, id, rating, title, comment);

    return successResponse(res, {
      statusCode: 200,
      message: "Review updated successfully.",
      payload: { review: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Delete Review Controller
// ==========================================
const handleDeleteReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { id } = req.params;

    const result = await deleteReviewService(userId, userRole, id);

    return successResponse(res, {
      statusCode: 200,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateReview,
  handleGetProductReviews,
  handleGetSingleReview,
  handleUpdateReview,
  handleDeleteReview,
};