const Wishlist = require("../models/wishlist.model");
const Product = require("../models/product.model");
const createError = require("http-errors");
const withTransaction = require("../utils/transaction");

// ==========================================
// Add To Wishlist Service (Transaction)
// ==========================================
const addToWishlistService = async (userId, productId) => {
  return withTransaction(async (session) => {
    // 1. Product check
    const product = await Product.findById(productId).session(session);

    if (!product) {
      throw createError(404, "Product not found.");
    }

    // 2. Wishlist find or create
    let wishlist = await Wishlist.findOne({ user: userId }).session(session);

    if (!wishlist) {
      wishlist = await Wishlist.create(
        [
          {
            user: userId,
            products: [],
          },
        ],
        { session }
      );
      wishlist = wishlist[0];
    }

    // 3. Already added check
    const alreadyAdded = wishlist.products.some(
      (p) => p.toString() === productId
    );

    if (alreadyAdded) {
      throw createError(409, "Product is already in your wishlist.");
    }

    // 4. Add product
    wishlist.products.push(productId);
    await wishlist.save({ session });

    // 5. Populate
    await wishlist.populate(
      "products",
      "name slug price discountPrice images stock"
    );

    return wishlist;
  });
};

// ==========================================
// Get Wishlist Service
// ==========================================
const getWishlistService = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId }).populate(
    "products",
    "name slug price discountPrice images stock"
  );

  if (!wishlist) {
    return {
      user: userId,
      products: [],
    };
  }

  return wishlist;
};

// ==========================================
// Remove From Wishlist Service (Transaction)
// ==========================================
const removeFromWishlistService = async (userId, productId) => {
  return withTransaction(async (session) => {
    // 1. Wishlist find
    const wishlist = await Wishlist.findOne({ user: userId }).session(session);

    if (!wishlist) {
      throw createError(404, "Wishlist not found.");
    }

    // 2. Remove product
    wishlist.products = wishlist.products.filter(
      (p) => p.toString() !== productId
    );

    await wishlist.save({ session });

    // 3. Populate
    await wishlist.populate(
      "products",
      "name slug price discountPrice images stock"
    );

    return wishlist;
  });
};

module.exports = {
  addToWishlistService,
  getWishlistService,
  removeFromWishlistService,
};