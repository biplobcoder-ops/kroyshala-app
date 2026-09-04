import React from "react";
import ProductCard from "./ProductCard";

// ==========================================
// Product Grid Component
// ==========================================

const ProductGrid = ({ products, loading, onAddToCart, onAddToWishlist }) => {
  // ==========================================
  // Loading State
  // ==========================================

  if (loading) {
    return (
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
    );
  }

  // ==========================================
  // Empty State
  // ==========================================

  if (!products || products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
        <p className="text-lg font-semibold text-slate-600">
          No products found
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  // ==========================================
  // Products Grid
  // ==========================================

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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