import React, { useState } from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiTrash2,
  FiArrowRight,
} from "react-icons/fi";

import Button from "../../../components/ui/Button/Button";
import Badge from "../../../components/ui/Badge/Badge";

// ==========================================
// Demo Wishlist Data
// ==========================================

const INITIAL_WISHLIST = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 850,
    oldPrice: 1100,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    category: "Fashion",
    inStock: true,
  },
  {
    id: 2,
    name: "Classic Wrist Watch",
    price: 2450,
    oldPrice: 2900,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    category: "Accessories",
    inStock: true,
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 1850,
    oldPrice: 2200,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    category: "Bags",
    inStock: false,
  },
];

// ==========================================
// Wishlist Page
// ==========================================

const WishlistPage = () => {
  const [wishlist, setWishlist] =
    useState(INITIAL_WISHLIST);

  // ==========================================
  // Remove Item
  // ==========================================

  const handleRemove = (id) => {
    setWishlist((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // ==========================================
  // Add To Cart
  // ==========================================

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  // ==========================================
  // Empty Wishlist
  // ==========================================

  if (wishlist.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <FiHeart className="h-9 w-9 text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Your Wishlist is Empty
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            You haven't added any products to your
            wishlist yet.
          </p>

          <Button
            variant="primary"
            size="md"
            rightIcon={<FiArrowRight />}
            className="mt-6"
            onClick={() =>
              console.log("Browse products")
            }
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
    <div className="space-y-6">

      {/* Header */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
            <FiHeart className="h-5 w-5 text-red-500" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              My Wishlist
            </h1>

            <p className="mt-0.5 text-sm text-slate-500">
              Products you saved for later.
            </p>
          </div>
        </div>
      </div>

      {/* Wishlist Count */}

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">
            {wishlist.length}
          </span>{" "}
          {wishlist.length === 1
            ? "product"
            : "products"}{" "}
          saved
        </p>
      </div>

      {/* Products */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >

            {/* Image */}

            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />

              {/* Remove */}

              <button
                type="button"
                onClick={() =>
                  handleRemove(product.id)
                }
                className="
                  absolute
                  right-3
                  top-3
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-slate-500
                  shadow-sm
                  transition
                  hover:bg-red-50
                  hover:text-red-500
                "
                aria-label={`Remove ${product.name}`}
              >
                <FiTrash2 className="h-4 w-4" />
              </button>

              {/* Category */}

              <div className="absolute bottom-3 left-3">
                <Badge variant="default">
                  {product.category}
                </Badge>
              </div>
            </div>

            {/* Content */}

            <div className="p-4">

              <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-slate-900">
                {product.name}
              </h3>

              {/* Price */}

              <div className="mt-3 flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">
                  ৳{product.price}
                </span>

                <span className="text-sm text-slate-400 line-through">
                  ৳{product.oldPrice}
                </span>
              </div>

              {/* Stock */}

              <p
                className={`mt-2 text-xs font-medium ${
                  product.inStock
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {product.inStock
                  ? "In Stock"
                  : "Out of Stock"}
              </p>

              {/* Action */}

              <Button
                type="button"
                variant="primary"
                size="sm"
                fullWidth
                leftIcon={<FiShoppingCart />}
                className="mt-4"
                disabled={!product.inStock}
                onClick={() =>
                  handleAddToCart(product)
                }
              >
                {product.inStock
                  ? "Add to Cart"
                  : "Out of Stock"}
              </Button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;