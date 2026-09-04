import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiGrid, FiArrowRight } from "react-icons/fi";

import Button from "../../../components/ui/Button/Button";
import Alert from "../../../components/ui/Alert/Alert";

import CategoryCard from "../components/CategoryCard";
import { fetchCategories, clearCategoryError } from "../store/categorySlice";

// ==========================================
// Categories Page
// ==========================================

const CategoriesPage = () => {
  // ==========================================
  // Redux
  // ==========================================

  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  // ==========================================
  // Fetch Categories
  // ==========================================

  useEffect(() => {
    dispatch(fetchCategories());

    // Cleanup
    return () => {
      dispatch(clearCategoryError());
    };
  }, [dispatch]);

  // ==========================================
  // Loading State
  // ==========================================

  if (loading && categories.length === 0) {
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
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ==========================================
          Header
      ========================================== */}

      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <FiGrid className="h-8 w-8 text-blue-600" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Shop by Category
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Browse products by category and find what you need
        </p>
      </div>

      {/* ==========================================
          Error Alert
      ========================================== */}

      {error && (
        <div className="mb-6">
          <Alert
            variant="error"
            title="Something went wrong"
            dismissible
            onClose={() => dispatch(clearCategoryError())}
          >
            {error}
          </Alert>
        </div>
      )}

      {/* ==========================================
          Categories Grid
      ========================================== */}

      {!loading && categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <FiGrid className="h-10 w-10 text-slate-400" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            No Categories Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Categories will appear here once they are added.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
            />
          ))}
        </div>
      )}

      {/* ==========================================
          Bottom CTA
      ========================================== */}

      <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">
          Can't find what you're looking for?
        </h2>

        <p className="mt-2 text-blue-100">
          Browse all products or search for something specific
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link to="/products">
            <Button
              variant="secondary"
              size="md"
              rightIcon={<FiArrowRight />}
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;