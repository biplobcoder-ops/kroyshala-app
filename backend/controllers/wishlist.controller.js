const {
  addToWishlistService,
  getWishlistService,
  removeFromWishlistService,
} = require("../services/wishlist.service");
const successResponse = require("../utils/successResponse");

// ==========================================
// Add To Wishlist Controller
// ==========================================
const handleAddToWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const result = await addToWishlistService(userId, productId);

    return successResponse(res, {
      statusCode: 200,
      message: "Product added to wishlist successfully.",
      payload: { wishlist: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get Wishlist Controller
// ==========================================
const handleGetWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await getWishlistService(userId);

    return successResponse(res, {
      statusCode: 200,
      message: "Wishlist fetched successfully.",
      payload: { wishlist: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Remove From Wishlist Controller
// ==========================================
const handleRemoveFromWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const result = await removeFromWishlistService(userId, productId);

    return successResponse(res, {
      statusCode: 200,
      message: "Product removed from wishlist successfully.",
      payload: { wishlist: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddToWishlist,
  handleGetWishlist,
  handleRemoveFromWishlist,
};