import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiStar,
  FiChevronRight,
  FiMessageSquare,
} from "react-icons/fi";
import toast from "react-hot-toast";

import Button from "../../../components/ui/Button/Button";
import Badge from "../../../components/ui/Badge/Badge";
import Alert from "../../../components/ui/Alert/Alert";
import Input from "../../../components/ui/Input/Input";

import { fetchProductBySlug } from "../store/productSlice";
import { addToCart } from "../../cart/store/cartSlice";
import { addToWishlist } from "../../wishlist/store/wishlistSlice";

import ReviewList from "../../review/components/ReviewList";
import ReviewForm from "../../review/components/ReviewForm";
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  clearReviewError,
} from "../../review/store/reviewSlice";

import searchApi from "../../search/services/searchApi";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const reviewState = useSelector((state) => state.review);
  const reviews = reviewState?.reviews || [];
  const reviewLoading = reviewState?.loading || false;
  const reviewError = reviewState?.error || null;
  const reviewSubmitting = reviewState?.submitting || false;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product and reviews
  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (singleProduct?._id) {
      dispatch(getProductReviews(singleProduct._id));
      // Fetch related products
      searchApi
        .getRelatedProducts(singleProduct._id)
        .then((response) => {
          setRelatedProducts(response?.payload?.relatedProducts || []);
        })
        .catch((error) =>
          console.error("Related products fetch error:", error)
        );
    }
    return () => {
      dispatch(clearReviewError());
    };
  }, [dispatch, singleProduct]);

  // Reset state when slug changes
  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
    setShowReviewForm(false);
    setEditingReview(null);
  }, [slug]);

  // ==========================================
  // Check Login Helper
  // ==========================================
  const checkLogin = (action) => {
    if (!isAuthenticated) {
      toast.error(`Please login to ${action}`);
      navigate("/login", {
        state: { from: `/products/${slug}` },
      });
      return false;
    }
    return true;
  };

  // ==========================================
  // Cart Handlers
  // ==========================================
  const handleAddToCart = () => {
    if (!checkLogin("add to cart")) return;
    if (!singleProduct?._id) {
      toast.error("Product not loaded. Please try again.");
      return;
    }

    dispatch(addToCart({ productId: singleProduct._id, quantity }))
      .unwrap()
      .then(() => toast.success("Product added to cart!"))
      .catch((error) => {
        console.error("Add to cart error:", error);
        if (error?.includes("token") || error?.includes("login") || error?.includes("Invalid")) {
          toast.error("Session expired. Please login again.");
          navigate("/login", { state: { from: `/products/${slug}` } });
        } else {
          toast.error(error || "Failed to add to cart");
        }
      });
  };

  const handleBuyNow = () => {
    if (!checkLogin("buy now")) return;
    if (!singleProduct?._id) {
      toast.error("Product not loaded. Please try again.");
      return;
    }

    dispatch(addToCart({ productId: singleProduct._id, quantity }))
      .unwrap()
      .then(() => navigate("/checkout"))
      .catch((error) => {
        console.error("Buy now error:", error);
        if (error?.includes("token") || error?.includes("login") || error?.includes("Invalid")) {
          toast.error("Session expired. Please login again.");
          navigate("/login", { state: { from: `/products/${slug}` } });
        } else {
          toast.error(error || "Failed to add to cart");
        }
      });
  };

  const handleToggleWishlist = () => {
    if (!checkLogin("add to wishlist")) return;
    if (!singleProduct?._id) {
      toast.error("Product not loaded. Please try again.");
      return;
    }

    dispatch(addToWishlist(singleProduct._id))
      .unwrap()
      .then(() => {
        setIsInWishlist(true);
        toast.success("Product added to wishlist!");
      })
      .catch((error) => {
        console.error("Wishlist error:", error);
        if (error?.includes("token") || error?.includes("login") || error?.includes("Invalid")) {
          toast.error("Session expired. Please login again.");
          navigate("/login", { state: { from: `/products/${slug}` } });
        } else {
          toast.error(error || "Failed to add to wishlist");
        }
      });
  };

  // ==========================================
  // Review Handlers
  // ==========================================
  const handleSubmitReview = (formData) => {
    if (!checkLogin("submit review")) return;

    if (editingReview) {
      dispatch(
        updateReview({
          reviewId: editingReview._id,
          reviewData: formData,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Review updated successfully!");
          setShowReviewForm(false);
          setEditingReview(null);
          if (singleProduct?._id) {
            dispatch(getProductReviews(singleProduct._id));
          }
        })
        .catch((error) => toast.error(error || "Failed to update review"));
    } else {
      dispatch(
        createReview({
          productId: singleProduct._id,
          ...formData,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Review submitted successfully!");
          setShowReviewForm(false);
          // no need to refetch, slice already added
          // but we can also refetch for safety
          if (singleProduct?._id) {
            dispatch(getProductReviews(singleProduct._id));
          }
        })
        .catch((error) => toast.error(error || "Failed to submit review"));
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
    window.scrollTo({
      top: document.querySelector("#review-section")?.offsetTop - 100 || 0,
      behavior: "smooth",
    });
  };

  const handleDeleteReview = (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    dispatch(deleteReview(reviewId))
      .unwrap()
      .then(() => {
        toast.success("Review deleted successfully!");
        if (singleProduct?._id) {
          dispatch(getProductReviews(singleProduct._id));
        }
      })
      .catch((error) => toast.error(error || "Failed to delete review"));
  };

  // ==========================================
  // Loading State
  // ==========================================
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="mb-6 h-10 w-32 rounded bg-slate-200" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-square rounded-2xl bg-slate-200" />
            <div className="space-y-4">
              <div className="h-4 w-1/4 rounded bg-slate-200" />
              <div className="h-8 w-3/4 rounded bg-slate-200" />
              <div className="h-6 w-1/3 rounded bg-slate-200" />
              <div className="h-32 rounded bg-slate-200" />
              <div className="h-12 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Error State
  // ==========================================
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert variant="error" title="Product not found" fullWidth>
          {error}
        </Alert>
        <div className="mt-4">
          <Link to="/products">
            <Button variant="outline" size="sm" leftIcon={<FiArrowLeft />}>
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert variant="warning" title="Product not found" fullWidth>
          The product you are looking for does not exist.
        </Alert>
      </div>
    );
  }

  const price =
    singleProduct.discountPrice > 0
      ? singleProduct.discountPrice
      : singleProduct.price;

  const discountPercent =
    singleProduct.discountPrice > 0
      ? Math.round(
          ((singleProduct.price - singleProduct.discountPrice) /
            singleProduct.price) *
            100
        )
      : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <FiChevronRight className="h-4 w-4" />
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <FiChevronRight className="h-4 w-4" />
        {singleProduct.category && (
          <>
            <Link to={`/categories/${singleProduct.category.slug}`} className="hover:text-blue-600">
              {singleProduct.category.name}
            </Link>
            <FiChevronRight className="h-4 w-4" />
          </>
        )}
        <span className="truncate text-slate-900">{singleProduct.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <img
              src={singleProduct.images?.[selectedImage]?.url || "/placeholder.png"}
              alt={singleProduct.name}
              className="h-full w-full object-cover"
            />
            {discountPercent > 0 && (
              <Badge variant="danger" size="lg" className="absolute left-4 top-4">
                -{discountPercent}%
              </Badge>
            )}
          </div>

          {singleProduct.images?.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {singleProduct.images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${singleProduct.name} - ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          {singleProduct.category && (
            <Link to={`/categories/${singleProduct.category.slug}`} className="text-sm font-medium text-blue-600 hover:underline">
              {singleProduct.category.name}
            </Link>
          )}

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {singleProduct.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <FiStar
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.floor(singleProduct.rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-600">
              {singleProduct.rating || 0} rating
            </span>
            <span className="text-sm text-slate-400">|</span>
            <span className="text-sm text-slate-600">
              {singleProduct.numReviews || 0} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-slate-900">৳{price}</span>
            {singleProduct.discountPrice > 0 && (
              <span className="text-xl text-slate-400 line-through">৳{singleProduct.price}</span>
            )}
            {singleProduct.stock > 0 ? (
              <Badge variant="success" size="sm">In Stock</Badge>
            ) : (
              <Badge variant="secondary" size="sm">Out of Stock</Badge>
            )}
          </div>

          {/* Description */}
          {singleProduct.description && (
            <div>
              <h2 className="mb-2 text-lg font-semibold text-slate-900">Description</h2>
              <p className="text-sm leading-6 text-slate-600">{singleProduct.description}</p>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Quantity</h2>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                rounded="lg"
                className="!h-11 !w-11 !p-0"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                <FiMinus className="h-4 w-4" />
              </Button>

              <Input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= singleProduct.stock) {
                    setQuantity(value);
                  }
                }}
                className="!h-11 !w-20 text-center"
                disabled={singleProduct.stock === 0}
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                rounded="lg"
                className="!h-11 !w-11 !p-0"
                onClick={() =>
                  setQuantity((prev) => Math.min(singleProduct.stock, prev + 1))
                }
                disabled={
                  quantity >= singleProduct.stock ||
                  singleProduct.stock === 0
                }
              >
                <FiPlus className="h-4 w-4" />
              </Button>

              <span className="text-sm text-slate-500">
                {singleProduct.stock} available
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<FiShoppingCart />}
              onClick={handleAddToCart}
              disabled={singleProduct.stock === 0}
            >
              Add to Cart
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              fullWidth
              leftIcon={<FiHeart />}
              onClick={handleToggleWishlist}
              className={
                isInWishlist
                  ? "!bg-red-50 !text-red-600 !border-red-200"
                  : ""
              }
            >
              {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          {/* Buy Now */}
          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            onClick={handleBuyNow}
            disabled={singleProduct.stock === 0}
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            Buy Now
          </Button>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <FiTruck className="h-5 w-5 shrink-0 text-blue-600" />
              <div>
                <p className="text-xs font-semibold text-slate-900">Free Delivery</p>
                <p className="text-xs text-slate-500">On orders over ৳500</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FiShield className="h-5 w-5 shrink-0 text-green-600" />
              <div>
                <p className="text-xs font-semibold text-slate-900">Secure Payment</p>
                <p className="text-xs text-slate-500">100% protected</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FiRefreshCw className="h-5 w-5 shrink-0 text-orange-600" />
              <div>
                <p className="text-xs font-semibold text-slate-900">Easy Returns</p>
                <p className="text-xs text-slate-500">7 days return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Related Products Section
      ========================================== */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
              >
                <Link to={`/products/${product.slug}`}>
                  <img
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.name}
                    className="mb-3 h-40 w-full rounded-lg object-cover"
                  />
                </Link>
                <Link
                  to={`/products/${product.slug}`}
                  className="line-clamp-2 font-semibold text-slate-900 hover:text-blue-600"
                >
                  {product.name}
                </Link>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  ৳{product.discountPrice || product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          Review Section
      ========================================== */}
      <div id="review-section" className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <FiMessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Customer Reviews
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {reviews.length} reviews for this product
              </p>
            </div>
          </div>

          {isAuthenticated && !showReviewForm && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                setEditingReview(null);
                setShowReviewForm(true);
              }}
            >
              Write a Review
            </Button>
          )}
        </div>

        {reviewError && (
          <div className="mb-4">
            <Alert
              variant="error"
              title="Something went wrong"
              dismissible
              onClose={() => dispatch(clearReviewError())}
            >
              {reviewError}
            </Alert>
          </div>
        )}

        {showReviewForm && (
          <div className="mb-6">
            <ReviewForm
              onSubmit={handleSubmitReview}
              submitting={reviewSubmitting}
              initialData={editingReview}
              onCancel={() => {
                setShowReviewForm(false);
                setEditingReview(null);
              }}
            />
          </div>
        )}

        {!isAuthenticated && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-600">Please login to write a review</p>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="mt-3"
              onClick={() =>
                navigate("/login", { state: { from: `/products/${slug}` } })
              }
            >
              Login to Review
            </Button>
          </div>
        )}

        <ReviewList
          reviews={reviews}
          loading={reviewLoading}
          currentUserId={user?._id}
          onEdit={handleEditReview}
          onDelete={handleDeleteReview}
          deleting={reviewSubmitting}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;