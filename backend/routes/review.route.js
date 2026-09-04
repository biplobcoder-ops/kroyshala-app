const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const {
  handleCreateReview,
  handleGetProductReviews,
  handleGetSingleReview,
  handleUpdateReview,
  handleDeleteReview,
} = require("../controllers/review.controller");

const reviewRouter = express.Router();

// Public routes
reviewRouter.get("/product/:productId", handleGetProductReviews);
reviewRouter.get("/:id", handleGetSingleReview);

// Logged in routes
reviewRouter.post("/create", isLoggedIn, handleCreateReview);
reviewRouter.put("/:id", isLoggedIn, handleUpdateReview);
reviewRouter.delete("/:id", isLoggedIn, handleDeleteReview);

module.exports = reviewRouter;