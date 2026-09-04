const express = require("express");
const { isLoggedIn } = require("../middlewares/auth");
const {
  handleGetCart,
  handleAddToCart,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
} = require("../controllers/cart.controller");

const cartRouter = express.Router();

// সব routes-এ login required
cartRouter.get("/", isLoggedIn, handleGetCart);
cartRouter.post("/add", isLoggedIn, handleAddToCart);
cartRouter.put("/update", isLoggedIn, handleUpdateCartQuantity);
cartRouter.delete("/remove/:productId", isLoggedIn, handleRemoveFromCart);

module.exports = cartRouter;