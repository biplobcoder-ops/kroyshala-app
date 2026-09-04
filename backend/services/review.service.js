const Review = require("../models/review.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const createError = require("http-errors");
const withTransaction = require("../utils/transaction");

// ==========================================
// Create Review Service (Transaction)
// ==========================================
const createReviewService = async (userId, productId, rating, title, comment) => {
  return withTransaction(async (session) => {
    // 1. Product check
    const product = await Product.findById(productId).session(session);

    if (!product) {
      throw createError(404, "Product not found.");
    }

    // 2. Already reviewed check
    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    }).session(session);

    if (existingReview) {
      throw createError(409, "You have already reviewed this product.");
    }

    // ✅ 3. Purchase check (any non-cancelled order)
    const hasPurchased = await Order.findOne({
      user: userId,
      "orderItems.product": productId,
      orderStatus: { $ne: "cancelled" }, // ✅ delivered নয়, শুধু cancelled বাদে
    }).session(session);

    if (!hasPurchased) {
      throw createError(403, "You can only review products you have purchased.");
    }

    // 4. Review create
    const review = await Review.create(
      [
        {
          user: userId,
          product: productId,
          rating: Number(rating),
          title: title || "",
          comment,
          isVerifiedPurchase: true, // ✅ buyer, তাই verified
        },
      ],
      { session }
    );

    // 5. Product rating update
    const allReviews = await Review.find({ product: productId }).session(session);
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);

    await Product.findByIdAndUpdate(
      productId,
      {
        rating: totalRating / allReviews.length,
        numReviews: allReviews.length,
      },
      { session }
    );

    // 6. Populate
    const populatedReview = await Review.findById(review[0]._id).populate(
      "user",
      "name image"
    );

    return populatedReview;
  });
};

// ==========================================
// Get Product Reviews Service
// ==========================================
const getProductReviewsService = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw createError(404, "Product not found.");
  }

  const reviews = await Review.find({ product: productId })
    .populate("user", "name image")
    .sort({ createdAt: -1 });

  return reviews;
};

// ==========================================
// Get Single Review Service
// ==========================================
const getSingleReviewService = async (reviewId) => {
  const review = await Review.findById(reviewId).populate("user", "name image");

  if (!review) {
    throw createError(404, "Review not found.");
  }

  return review;
};

// ==========================================
// Update Review Service (Transaction)
// ==========================================
const updateReviewService = async (userId, reviewId, rating, title, comment) => {
  return withTransaction(async (session) => {
    // 1. Review find
    const review = await Review.findById(reviewId).session(session);

    if (!review) {
      throw createError(404, "Review not found.");
    }

    // 2. Owner check
    if (review.user.toString() !== userId.toString()) {
      throw createError(403, "You can only update your own review.");
    }

    // 3. Update
    if (rating) review.rating = Number(rating);
    if (title !== undefined) review.title = title;
    if (comment) review.comment = comment;

    await review.save({ session });

    // 4. Product rating update
    const allReviews = await Review.find({ product: review.product }).session(session);
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);

    await Product.findByIdAndUpdate(
      review.product,
      {
        rating: totalRating / allReviews.length,
        numReviews: allReviews.length,
      },
      { session }
    );

    // 5. Populate
    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name image"
    );

    return populatedReview;
  });
};

// ==========================================
// Delete Review Service (Transaction)
// ==========================================
const deleteReviewService = async (userId, userRole, reviewId) => {
  return withTransaction(async (session) => {
    // 1. Review find
    const review = await Review.findById(reviewId).session(session);

    if (!review) {
      throw createError(404, "Review not found.");
    }

    // 2. Owner or Admin check
    if (review.user.toString() !== userId.toString() && userRole !== "admin") {
      throw createError(403, "You can only delete your own review.");
    }

    // 3. Delete review
    await Review.findByIdAndDelete(reviewId).session(session);

    // 4. Product rating update
    const allReviews = await Review.find({ product: review.product }).session(session);

    if (allReviews.length > 0) {
      const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
      await Product.findByIdAndUpdate(
        review.product,
        {
          rating: totalRating / allReviews.length,
          numReviews: allReviews.length,
        },
        { session }
      );
    } else {
      await Product.findByIdAndUpdate(
        review.product,
        {
          rating: 0,
          numReviews: 0,
        },
        { session }
      );
    }

    return { message: "Review deleted successfully." };
  });
};

module.exports = {
  createReviewService,
  getProductReviewsService,
  getSingleReviewService,
  updateReviewService,
  deleteReviewService,
};