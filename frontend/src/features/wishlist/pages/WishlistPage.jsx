import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  FiHeart,
  FiArrowRight,
  FiShoppingCart,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import toast from "react-hot-toast";

import Button from "../../../components/ui/Button/Button";
import Alert from "../../../components/ui/Alert/Alert";
import Badge from "../../../components/ui/Badge/Badge";

import {
  fetchWishlist,
  removeFromWishlist,
  clearWishlistError,
} from "../store/wishlistSlice";

import { addToCart } from "../../cart/store/cartSlice";

// ==========================================
// Wishlist Page
// ==========================================

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistState = useSelector((state) => state.wishlist);
  const items = wishlistState?.items || [];
  const loading = wishlistState?.loading || false;
  const error = wishlistState?.error || null;

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: "/wishlist" },
        replace: true,
      });
      return;
    }

    dispatch(fetchWishlist());

    return () => {
      dispatch(clearWishlistError());
    };
  }, [dispatch, isAuthenticated, navigate]);

  // ==========================================
  // Remove From Wishlist
  // ==========================================

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId))
      .unwrap()
      .then(() => {
        toast.success("Product removed from wishlist!");
      })
      .catch((error) => {
        toast.error(error || "Failed to remove from wishlist");
      });
  };

  // ==========================================
  // Add To Cart
  // ==========================================

  const handleAddToCart = (product) => {
    if (!product?._id) return;

    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success("Product added to cart!");
      })
      .catch((error) => {
        toast.error(error || "Failed to add to cart");
      });
  };

  // ==========================================
  // Loading State
  // ==========================================

  if (loading && items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-64 rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl bg-slate-100"
            >
              <div className="aspect-square rounded-t-2xl bg-slate-200" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
                <div className="h-8 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // Empty State
  // ==========================================

  if (!loading && items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <FiHeart className="h-10 w-10 text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Your Wishlist is Empty
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            You haven't added any products to your wishlist yet.
          </p>

          <Button
            type="button"
            variant="primary"
            size="md"
            rightIcon={<FiArrowRight />}
            className="mt-6"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
            <FiHeart className="h-5 w-5 text-red-500" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              My Wishlist
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {items.length} products saved
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={<FiShoppingCart />}
          onClick={() => navigate("/cart")}
          className="hidden sm:flex"
        >
          Go to Cart
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4">
          <Alert
            variant="error"
            title="Something went wrong"
            dismissible
            onClose={() => dispatch(clearWishlistError())}
          >
            {error}
          </Alert>
        </div>
      )}

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product, index) => {
          if (!product || !product._id) return null;

          const price =
            product.discountPrice > 0
              ? product.discountPrice
              : product.price;

          return (
            <div
              key={product._id || index}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <Link to={`/products/${product.slug}`}>
                  <img
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>

                {/* Stock Badge */}
                {product.stock === 0 ? (
                  <Badge
                    variant="secondary"
                    size="sm"
                    className="absolute right-3 top-3"
                  >
                    Out of Stock
                  </Badge>
                ) : (
                  <Badge
                    variant="success"
                    size="sm"
                    className="absolute right-3 top-3"
                  >
                    In Stock
                  </Badge>
                )}

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemove(product._id)}
                  disabled={loading}
                  className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Remove from wishlist"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                {product.category && (
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-blue-600">
                    {product.category.name}
                  </p>
                )}

                <Link to={`/products/${product.slug}`}>
                  <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-900">
                    ৳{price}
                  </span>

                  {product.discountPrice > 0 && (
                    <span className="text-sm text-slate-400 line-through">
                      ৳{product.price}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    fullWidth
                    leftIcon={<FiShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                    disabled={loading || product.stock === 0}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>

                  <Link
                    to={`/products/${product.slug}`}
                    className="shrink-0"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      rounded="lg"
                      className="!h-9 !w-9 !p-0"
                      title="View Details"
                    >
                      <FiEye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;