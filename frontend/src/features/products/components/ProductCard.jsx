import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiEye, FiLoader } from "react-icons/fi";
import Card from "../../../components/ui/Card/Card";
import Button from "../../../components/ui/Button/Button";
import Badge from "../../../components/ui/Badge/Badge";

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const price =
    product.discountPrice > 0 ? product.discountPrice : product.price;

  const discountPercent =
    product.discountPrice > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100
        )
      : 0;

  const handleAddToCart = async () => {
    setCartLoading(true);
    try {
      await onAddToCart?.(product);
    } finally {
      setCartLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    setWishlistLoading(true);
    try {
      await onAddToWishlist?.(product);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        {discountPercent > 0 && (
          <Badge variant="danger" size="sm" className="absolute left-3 top-3">
            -{discountPercent}%
          </Badge>
        )}

        {product.stock === 0 && (
          <Badge variant="secondary" size="sm" className="absolute right-3 top-3">
            Out of Stock
          </Badge>
        )}

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            type="button"
            variant="outline"
            size="sm"
            rounded="full"
            className="!h-10 !w-10 !p-0 bg-white"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || cartLoading}
            title="Add to Cart"
          >
            {cartLoading ? (
              <FiLoader className="h-4 w-4 animate-spin" />
            ) : (
              <FiShoppingCart className="h-4 w-4" />
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            rounded="full"
            className="!h-10 !w-10 !p-0 bg-white"
            onClick={handleAddToWishlist}
            disabled={wishlistLoading}
            title="Add to Wishlist"
          >
            {wishlistLoading ? (
              <FiLoader className="h-4 w-4 animate-spin" />
            ) : (
              <FiHeart className="h-4 w-4" />
            )}
          </Button>

          <Link to={`/products/${product.slug}`}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              rounded="full"
              className="!h-10 !w-10 !p-0 bg-white"
              title="View Details"
            >
              <FiEye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

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

        {product.rating > 0 && (
          <div className="mt-2 flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-xs font-medium text-slate-600">
              {product.rating}
            </span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900">
              ৳{price}
            </span>

            {product.discountPrice > 0 && (
              <span className="text-sm text-slate-400 line-through">
                ৳{product.price}
              </span>
            )}
          </div>

          {product.stock > 0 && (
            <span className="text-xs font-medium text-green-600">
              In Stock
            </span>
          )}
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          fullWidth
          leftIcon={
            cartLoading ? (
              <FiLoader className="h-4 w-4 animate-spin" />
            ) : (
              <FiShoppingCart />
            )
          }
          className="mt-3"
          onClick={handleAddToCart}
          disabled={product.stock === 0 || cartLoading}
        >
          {cartLoading
            ? "Adding..."
            : product.stock === 0
            ? "Out of Stock"
            : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;