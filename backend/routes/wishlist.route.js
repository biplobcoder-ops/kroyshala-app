const express = require("express");
const { isLoggedIn } = require("../middlewares/auth");
const {
  handleAddToWishlist,
  handleGetWishlist,
  handleRemoveFromWishlist,
} = require("../controllers/wishlist.controller");

const wishlistRouter = express.Router();

wishlistRouter.post("/add", isLoggedIn, handleAddToWishlist);
wishlistRouter.get("/", isLoggedIn, handleGetWishlist);
wishlistRouter.delete("/remove/:productId", isLoggedIn, handleRemoveFromWishlist);

module.exports = wishlistRouter;