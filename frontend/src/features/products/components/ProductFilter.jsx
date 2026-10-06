import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp, FiCheck, FiX } from "react-icons/fi";

const ProductFilter = ({ categories = [], activeFilters = {}, onFilterChange }) => {
  const { category = "", brand = "", minPrice = "", maxPrice = "" } = activeFilters;

  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    brand: true,
  });

  const [priceRange, setPriceRange] = useState({
    min: minPrice || "",
    max: maxPrice || "",
  });

  const [brandSearch, setBrandSearch] = useState("");

  // Common brands
  const brandsList = [
    "Apple",
    "Samsung",
    "Nike",
    "Pran",
    "Rupchanda",
    "Aarong",
    "The Ordinary",
    "Dabur",
    "Shine",
    "Essenza",
    "Yellow",
  ];

  const selectedBrands = brand ? brand.split(",") : [];

  const filteredBrands = brandsList.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  useEffect(() => {
    setPriceRange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice]);

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateParams = (updates) => {
    const params = new URLSearchParams();

    // Keep existing search + sort
    const current = new URLSearchParams(window.location.search);
    const search = current.get("search");
    const sort = current.get("sort");

    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);

    const merged = { category, brand, minPrice, maxPrice, ...updates };
    if (merged.category) params.set("category", merged.category);
    if (merged.brand) params.set("brand", merged.brand);
    if (merged.minPrice) params.set("minPrice", merged.minPrice);
    if (merged.maxPrice) params.set("maxPrice", merged.maxPrice);

    params.set("page", "1");
    onFilterChange?.(params);
  };

  const handleCategorySelect = (slug) => {
    updateParams({ category: category === slug ? "" : slug });
  };

  const handleBrandToggle = (brandName) => {
    const newBrands = selectedBrands.includes(brandName)
      ? selectedBrands.filter((b) => b !== brandName)
      : [...selectedBrands, brandName];

    updateParams({ brand: newBrands.join(",") });
  };

  const handlePriceApply = () => {
    updateParams({ minPrice: priceRange.min, maxPrice: priceRange.max });
  };

  const clearAll = () => {
    onFilterChange?.(new URLSearchParams({ page: "1" }));
  };

  const hasActiveFilters = category || brand || minPrice || maxPrice;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-900">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* ---------- CATEGORY ---------- */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-neutral-50"
        >
          <span className="text-sm font-semibold text-neutral-900">
            Categories
          </span>
          {openSections.category ? (
            <FiChevronUp className="h-4 w-4 text-neutral-500" />
          ) : (
            <FiChevronDown className="h-4 w-4 text-neutral-500" />
          )}
        </button>

        {openSections.category && (
          <div className="border-t border-neutral-100 p-3">
            <div className="space-y-0.5">
              {categories.map((cat) => {
                const isActive = category === cat.slug;
                return (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-primary-50 font-semibold text-primary-700"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        isActive
                          ? "border-primary-600 bg-primary-600"
                          : "border-neutral-300"
                      }`}
                    >
                      {isActive && <FiCheck className="h-3 w-3 text-white" />}
                    </span>
                    <span className="flex-1 truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ---------- PRICE RANGE ---------- */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-neutral-50"
        >
          <span className="text-sm font-semibold text-neutral-900">
            Price Range
          </span>
          {openSections.price ? (
            <FiChevronUp className="h-4 w-4 text-neutral-500" />
          ) : (
            <FiChevronDown className="h-4 w-4 text-neutral-500" />
          )}
        </button>

        {openSections.price && (
          <div className="border-t border-neutral-100 p-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                  Min
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((p) => ({ ...p, min: e.target.value }))
                  }
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none transition-colors focus:border-primary-500 focus:bg-white"
                />
              </div>
              <span className="mt-5 text-neutral-400">—</span>
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                  Max
                </label>
                <input
                  type="number"
                  placeholder="100000"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((p) => ({ ...p, max: e.target.value }))
                  }
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none transition-colors focus:border-primary-500 focus:bg-white"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handlePriceApply}
              className="mt-3 w-full rounded-lg bg-primary-600 py-2 text-xs font-semibold text-white transition-all hover:bg-primary-700"
            >
              Apply Price
            </button>
          </div>
        )}
      </div>

      {/* ---------- BRANDS ---------- */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <button
          type="button"
          onClick={() => toggleSection("brand")}
          className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-neutral-50"
        >
          <span className="text-sm font-semibold text-neutral-900">Brands</span>
          {openSections.brand ? (
            <FiChevronUp className="h-4 w-4 text-neutral-500" />
          ) : (
            <FiChevronDown className="h-4 w-4 text-neutral-500" />
          )}
        </button>

        {openSections.brand && (
          <div className="border-t border-neutral-100 p-4">
            {/* Brand Search */}
            <input
              type="text"
              placeholder="Search brands..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="mb-3 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none transition-colors focus:border-primary-500 focus:bg-white"
            />

            <div className="max-h-56 space-y-0.5 overflow-y-auto pr-1">
              {filteredBrands.map((brandName) => {
                const isActive = selectedBrands.includes(brandName);
                return (
                  <button
                    key={brandName}
                    type="button"
                    onClick={() => handleBrandToggle(brandName)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-primary-50 font-semibold text-primary-700"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        isActive
                          ? "border-primary-600 bg-primary-600"
                          : "border-neutral-300"
                      }`}
                    >
                      {isActive && <FiCheck className="h-3 w-3 text-white" />}
                    </span>
                    <span className="flex-1 truncate">{brandName}</span>
                  </button>
                );
              })}
              {filteredBrands.length === 0 && (
                <p className="py-3 text-center text-xs text-neutral-500">
                  No brands found
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
