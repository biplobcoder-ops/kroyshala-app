import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiEye,
  FiLoader,
  FiStar,
} from "react-icons/fi";
import Card from "../../../components/ui/Card/Card";
import Button from "../../../components/ui/Button/Button";
import Badge from "../../../components/ui/Badge/Badge";

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const price =
    product.discountPrice > 0 ? product.discountPrice : product.price;

  const discountPercent =
    product.discountPrice > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100
        )
      : 0;

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    setCartLoading(true);
    try {
      await onAddToCart?.(product);
    } finally {
      setCartLoading(false);
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setWishlistLoading(true);
    try {
      await onAddToWishlist?.(product);
      setIsWishlisted((prev) => !prev);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg">
      {/* ========== IMAGE SECTION ========== */}
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        <Link to={`/products/${product.slug}`} className="block h-full w-full">
          <img
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* ========== BADGES (Top Left) ========== */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discountPercent > 0 && (
            <span className="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.isFeatured && (
            <span className="inline-flex items-center rounded-md bg-primary-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* ========== WISHLIST BUTTON (Top Right - Always Visible) ========== */}
        <button
          type="button"
          onClick={handleAddToWishlist}
          disabled={wishlistLoading}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white ${
            isWishlisted ? "text-red-500" : "text-neutral-600"
          }`}
          aria-label="Add to wishlist"
        >
          {wishlistLoading ? (
            <FiLoader className="h-4 w-4 animate-spin" />
          ) : (
            <FiHeart
              className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          )}
        </button>

        {/* ========== OUT OF STOCK OVERLAY ========== */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-[2px]">
            <span className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
              Out of Stock
            </span>
          </div>
        )}

        {/* ========== QUICK ACTIONS (Bottom - Hover) ========== */}
        {!isOutOfStock && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-md transition-all hover:bg-primary-600 hover:text-white hover:border-primary-600"
              title="Add to Cart"
            >
              {cartLoading ? (
                <FiLoader className="h-4 w-4 animate-spin" />
              ) : (
                <FiShoppingCart className="h-4 w-4" />
              )}
            </button>

            <Link
              to={`/products/${product.slug}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-md transition-all hover:bg-primary-600 hover:text-white hover:border-primary-600"
              title="View Details"
            >
              <FiEye className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* ========== CONTENT SECTION ========== */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category Label */}
        {product.category && (
          <Link
            to={`/categories/${product.category.slug}`}
            className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary-600 transition-colors hover:text-primary-700"
          >
            {product.category.name}
          </Link>
        )}

        {/* Product Name */}
        <Link to={`/products/${product.slug}`} className="group/title">
          <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold leading-snug text-neutral-900 transition-colors group-hover/title:text-primary-600">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-neutral-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-medium text-neutral-500">
              {product.rating.toFixed(1)}
              {product.numReviews > 0 && (
                <span className="ml-0.5">({product.numReviews})</span>
              )}
            </span>
          </div>
        )}

        {/* Price Row */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-neutral-900">৳{price}</span>
          {product.discountPrice > 0 && (
            <span className="text-xs text-neutral-400 line-through">
              ৳{product.price}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2 mb-3 flex items-center gap-1.5">
          {isOutOfStock ? (
            <span className="text-[11px] font-medium text-red-600">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span className="text-[11px] font-medium text-amber-600">
                Only {product.stock} left
              </span>
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-medium text-emerald-600">
                In Stock
              </span>
            </>
          )}
        </div>

        {/* ========== ADD TO CART BUTTON ========== */}
        <Button
          type="button"
          variant="primary"
          size="sm"
          fullWidth
          leftIcon={
            cartLoading ? (
              <FiLoader className="h-4 w-4 animate-spin" />
            ) : (
              <FiShoppingCart className="h-4 w-4" />
            )
          }
          className="mt-auto"
          onClick={handleAddToCart}
          disabled={isOutOfStock || cartLoading}
        >
          {cartLoading
            ? "Adding..."
            : isOutOfStock
            ? "Out of Stock"
            : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
