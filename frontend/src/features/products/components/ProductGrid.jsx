import React from "react";
import { FiPackage } from "react-icons/fi";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [], loading = false, onAddToCart, onAddToWishlist }) => {
  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
          >
            <div className="aspect-square skeleton" />
            <div className="space-y-2 p-4">
              <div className="skeleton h-2 w-16 rounded" />
              <div className="skeleton h-3.5 w-full rounded" />
              <div className="skeleton h-3.5 w-3/4 rounded" />
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-8 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
          <FiPackage className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-neutral-900">
          No products found
        </h3>
        <p className="mt-1 max-w-sm text-sm text-neutral-500">
          Try adjusting your filters or search terms to find what you're looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
