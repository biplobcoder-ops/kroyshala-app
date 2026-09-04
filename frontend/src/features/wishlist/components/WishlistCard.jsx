import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiTrash2, FiEye, FiLoader } from "react-icons/fi";
import Card from "../../../components/ui/Card/Card";
import Button from "../../../components/ui/Button/Button";
import Badge from "../../../components/ui/Badge/Badge";

const WishlistCard = ({ item, onRemove, onAddToCart, loading }) => {
  const product = item?.product || item;
  const [removeLoading, setRemoveLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  if (!product) return null;

  const price =
    product.discountPrice > 0 ? product.discountPrice : product.price;

  const handleRemove = async () => {
    setRemoveLoading(true);
    try {
      await onRemove?.(product._id);
    } finally {
      setRemoveLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setCartLoading(true);
    try {
      await onAddToCart?.(product);
    } finally {
      setCartLoading(false);
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

        {product.stock === 0 ? (
          <Badge variant="secondary" size="sm" className="absolute right-3 top-3">
            Out of Stock
          </Badge>
        ) : (
          <Badge variant="success" size="sm" className="absolute right-3 top-3">
            In Stock
          </Badge>
        )}

        <button
          type="button"
          onClick={handleRemove}
          disabled={loading || removeLoading}
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          title="Remove from wishlist"
        >
          {removeLoading ? (
            <FiLoader className="h-4 w-4 animate-spin" />
          ) : (
            <FiTrash2 className="h-4 w-4" />
          )}
        </button>
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
            leftIcon={
              cartLoading ? (
                <FiLoader className="h-4 w-4 animate-spin" />
              ) : (
                <FiShoppingCart />
              )
            }
            onClick={handleAddToCart}
            disabled={loading || cartLoading || product.stock === 0}
          >
            {cartLoading
              ? "Adding..."
              : product.stock === 0
              ? "Out of Stock"
              : "Add to Cart"}
          </Button>

          <Link to={`/products/${product.slug}`} className="shrink-0">
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
    </Card>
  );
};

export default WishlistCard;