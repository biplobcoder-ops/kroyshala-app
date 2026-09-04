const express = require("express");
const {
  handleSearchSuggestions,
  handleRelatedProducts,
} = require("../controllers/search.controller");

const searchRouter = express.Router();

// ==========================================
// Search Suggestions (Public)
// GET /api/search/suggestions?query=iphone
// ==========================================

searchRouter.get("/suggestions", handleSearchSuggestions);

// ==========================================
// Related Products (Public)
// GET /api/search/related/:productId
// ==========================================

searchRouter.get("/related/:productId", handleRelatedProducts);

module.exports = searchRouter;