const {
  searchSuggestionsService,
  relatedProductsService,
} = require("../services/search.service");
const successResponse = require("../utils/successResponse");

// ==========================================
// Search Suggestions Controller
// ==========================================

const handleSearchSuggestions = async (req, res, next) => {
  try {
    const { query } = req.query;

    const result = await searchSuggestionsService(query);

    return successResponse(res, {
      statusCode: 200,
      message: "Search suggestions fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Related Products Controller
// ==========================================

const handleRelatedProducts = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const result = await relatedProductsService(productId);

    return successResponse(res, {
      statusCode: 200,
      message: "Related products fetched successfully.",
      payload: { relatedProducts: result, count: result.length },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleSearchSuggestions,
  handleRelatedProducts,
};