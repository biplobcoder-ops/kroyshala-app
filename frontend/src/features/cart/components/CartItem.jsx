import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2, FiPackage, FiLoader } from "react-icons/fi";
import Button from "../../../components/ui/Button/Button";
import Badge from "../../../components/ui/Badge/Badge";

const CartItem = ({ item, onUpdateQuantity, onRemove, loading }) => {
  const [actionLoading, setActionLoading] = useState(null);
  const product = item?.product;

  if (!product) {
    return null;
  }

  const price =
    product.discountPrice > 0 ? product.discountPrice : product.price;

  const totalItemPrice = price * item.quantity;

  const handleUpdate = async (productId, quantity) => {
    setActionLoading("update");
    try {
      await onUpdateQuantity?.(productId, quantity);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemove = async (productId) => {
    setActionLoading("remove");
    try {
      await onRemove?.(productId);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
      <Link
        to={`/products/${product.slug}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100"
      >
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FiPackage className="h-8 w-8 text-slate-400" />
          </div>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          to={`/products/${product.slug}`}
          className="line-clamp-2 text-sm font-semibold text-slate-900 hover:text-blue-600"
        >
          {product.name}
        </Link>

        {product.category && (
          <p className="mt-1 text-xs text-slate-500">
            {product.category.name}
          </p>
        )}

        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-slate-900">
            ৳{price}
          </span>

          {product.discountPrice > 0 && (
            <span className="text-xs text-slate-400 line-through">
              ৳{product.price}
            </span>
          )}

          {product.stock === 0 && (
            <Badge variant="secondary" size="sm">
              Out of Stock
            </Badge>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              rounded="full"
              className="!h-8 !w-8 !p-0"
              onClick={() => handleUpdate(product._id, item.quantity - 1)}
              disabled={
                loading ||
                actionLoading === "update" ||
                item.quantity <= 1
              }
            >
              <FiMinus className="h-3 w-3" />
            </Button>

            <span className="min-w-8 text-center text-sm font-semibold">
              {item.quantity}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              rounded="full"
              className="!h-8 !w-8 !p-0"
              onClick={() => handleUpdate(product._id, item.quantity + 1)}
              disabled={
                loading ||
                actionLoading === "update" ||
                item.quantity >= (product.stock || 0)
              }
            >
              <FiPlus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-900">
              ৳{totalItemPrice}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              rounded="full"
              className="!h-8 !w-8 !p-0 !text-red-500 hover:!bg-red-50"
              onClick={() => handleRemove(product._id)}
              disabled={loading || actionLoading === "remove"}
              title="Remove from cart"
            >
              {actionLoading === "remove" ? (
                <FiLoader className="h-3 w-3 animate-spin" />
              ) : (
                <FiTrash2 className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;