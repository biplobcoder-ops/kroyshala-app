const {
  getCartService,
  addToCartService,
  updateCartQuantityService,
  removeFromCartService,
} = require("../services/cart.service");
const successResponse = require("../utils/successResponse");

// ==========================================
// Get Cart Controller
// ==========================================
const handleGetCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await getCartService(userId);

    return successResponse(res, {
      statusCode: 200,
      message: "Cart fetched successfully.",
      payload: { cart: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Add To Cart Controller
// ==========================================
const handleAddToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const result = await addToCartService(userId, productId, quantity);

    return successResponse(res, {
      statusCode: 200,
      message: "Product added to cart successfully.",
      payload: { cart: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Update Cart Quantity Controller
// ==========================================
const handleUpdateCartQuantity = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const result = await updateCartQuantityService(userId, productId, quantity);

    return successResponse(res, {
      statusCode: 200,
      message: "Cart quantity updated successfully.",
      payload: { cart: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Remove From Cart Controller
// ==========================================
const handleRemoveFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const result = await removeFromCartService(userId, productId);

    return successResponse(res, {
      statusCode: 200,
      message: "Product removed from cart successfully.",
      payload: { cart: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetCart,
  handleAddToCart,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
};