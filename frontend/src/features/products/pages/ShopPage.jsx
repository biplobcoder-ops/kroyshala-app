import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import Pagination from "../../../components/ui/Pagination/Pagination";
import Button from "../../../components/ui/Button/Button";
import { fetchProducts } from "../store/productSlice";
import { fetchCategories } from "../../categories/store/categorySlice";

const ShopPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, total, page, pages } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.categories);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // URL params
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search") || "";
  const categorySlug = searchParams.get("category") || "";
  const brandParam = searchParams.get("brand") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sortParam = searchParams.get("sort") || "-createdAt";

  // Fetch products on params change
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        limit: 12,
        search: searchTerm,
        category: categorySlug,
        brand: brandParam,
        minPrice,
        maxPrice,
        sort: sortParam,
      })
    );
  }, [
    dispatch,
    currentPage,
    searchTerm,
    categorySlug,
    brandParam,
    minPrice,
    maxPrice,
    sortParam,
  ]);

  // Fetch categories once
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Sort options
  const sortOptions = [
    { value: "-createdAt", label: "Newest First" },
    { value: "createdAt", label: "Oldest First" },
    { value: "price", label: "Price: Low to High" },
    { value: "-price", label: "Price: High to Low" },
    { value: "-rating", label: "Top Rated" },
    { value: "-soldCount", label: "Best Selling" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortParam)?.label || "Newest First";

  // Active filter chips
  const activeFilters = [];
  if (searchTerm) activeFilters.push({ key: "search", label: `Search: "${searchTerm}"` });
  if (categorySlug) {
    const cat = categories?.find((c) => c.slug === categorySlug);
    activeFilters.push({ key: "category", label: cat?.name || categorySlug });
  }
  if (brandParam) {
    brandParam.split(",").forEach((b) => {
      activeFilters.push({ key: `brand-${b}`, label: `Brand: ${b}` });
    });
  }
  if (minPrice) activeFilters.push({ key: "minPrice", label: `Min: ৳${minPrice}` });
  if (maxPrice) activeFilters.push({ key: "maxPrice", label: `Max: ৳${maxPrice}` });

  const clearFilter = (key) => {
    const newParams = new URLSearchParams(searchParams);
    if (key.startsWith("brand-")) {
      const brandToRemove = key.replace("brand-", "");
      const brands = brandParam.split(",").filter((b) => b !== brandToRemove);
      if (brands.length > 0) {
        newParams.set("brand", brands.join(","));
      } else {
        newParams.delete("brand");
      }
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({ page: "1" });
  };

  const handleSort = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    newParams.set("page", "1");
    setSearchParams(newParams);
    setIsSortOpen(false);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ========== PAGE HEADER ========== */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl font-display">
            All Products
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Discover our complete collection of premium products
          </p>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* ---------- DESKTOP FILTER SIDEBAR ---------- */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <ProductFilter
                categories={categories}
                activeFilters={{
                  category: categorySlug,
                  brand: brandParam,
                  minPrice,
                  maxPrice,
                }}
                onFilterChange={setSearchParams}
              />
            </div>
          </aside>

          {/* ---------- PRODUCTS AREA ---------- */}
          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-3 sm:p-4">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<FiFilter />}
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden"
                >
                  Filters
                  {activeFilters.length > 0 && (
                    <span className="ml-1.5 rounded-full bg-primary-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {activeFilters.length}
                    </span>
                  )}
                </Button>

                <p className="text-sm text-neutral-600">
                  <span className="font-semibold text-neutral-900">{total}</span>{" "}
                  products
                </p>
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                >
                  <span className="hidden sm:inline">Sort by:</span>
                  <span className="font-semibold text-neutral-900">
                    {currentSortLabel}
                  </span>
                  <FiChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isSortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsSortOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg animate-slide-down">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSort(opt.value)}
                          className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 ${
                            opt.value === sortParam
                              ? "bg-primary-50 font-semibold text-primary-700"
                              : "text-neutral-700"
                          }`}
                        >
                          {opt.label}
                          {opt.value === sortParam && (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilters.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {activeFilters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => clearFilter(filter.key)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    {filter.label}
                    <FiX className="h-3 w-3" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid products={products} loading={loading} />

            {/* Pagination */}
            {!loading && pages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination
                  currentPage={page || currentPage}
                  totalPages={pages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========== MOBILE FILTER DRAWER ========== */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-neutral-900/40 backdrop-blur-[2px] lg:hidden animate-fade-in"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-[100] flex w-[min(85vw,360px)] flex-col bg-white shadow-2xl lg:hidden animate-slide-left">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
              <h3 className="text-base font-semibold text-neutral-900">
                Filters
              </h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <ProductFilter
                categories={categories}
                activeFilters={{
                  category: categorySlug,
                  brand: brandParam,
                  minPrice,
                  maxPrice,
                }}
                onFilterChange={(params) => {
                  setSearchParams(params);
                  setIsMobileFilterOpen(false);
                }}
              />
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default ShopPage;
