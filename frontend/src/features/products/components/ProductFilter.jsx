import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";

import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";

import { fetchProductFilters } from "../store/productSlice";

// ==========================================
// Product Filter Component
// ==========================================

const ProductFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.products.filterData);

  const [openSection, setOpenSection] = useState("categories");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Fetch filter data
  useEffect(() => {
    dispatch(fetchProductFilters());
  }, [dispatch]);

  // Toggle section
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  // Brand toggle
  const handleBrandToggle = (brand) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(newBrands);
    onFilterChange({ brand: newBrands.join(",") });
  };

  // Price change
  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange({ minPrice: newPriceRange.min, maxPrice: newPriceRange.max });
  };

  return (
    <div className="space-y-2">
      {/* Categories Section */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => toggleSection("categories")}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          <span>Categories</span>
          {openSection === "categories" ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
        </button>

        {openSection === "categories" && (
          <div className="max-h-60 space-y-1 overflow-y-auto border-t border-slate-100 p-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50">
              <input
                type="radio"
                name="category"
                checked={!filters.category}
                onChange={() => onFilterChange({ category: "" })}
                className="h-4 w-4 accent-blue-600"
              />
              <span className="text-sm text-slate-700">All Categories</span>
            </label>

            {filterData?.categories?.map((category) => (
              <label key={category._id} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category.slug}
                  onChange={() => onFilterChange({ category: category.slug })}
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-sm text-slate-700">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          <span>Price Range</span>
          {openSection === "price" ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
        </button>

        {openSection === "price" && (
          <div className="border-t border-slate-100 p-4">
            <div className="flex items-center gap-2">
              <Input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => handlePriceChange("min", e.target.value)} className="!h-10" />
              <span className="text-slate-400">-</span>
              <Input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => handlePriceChange("max", e.target.value)} className="!h-10" />
            </div>

            <div className="mt-3 space-y-1">
              {[
                { label: "Under ৳500", min: "", max: "500" },
                { label: "৳500 - ৳1000", min: "500", max: "1000" },
                { label: "৳1000 - ৳5000", min: "1000", max: "5000" },
                { label: "Above ৳5000", min: "5000", max: "" },
              ].map((range) => (
                <label key={range.label} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-slate-50">
                  <input
                    type="radio"
                    name="price-range"
                    checked={priceRange.min === range.min && priceRange.max === range.max}
                    onChange={() => {
                      setPriceRange({ min: range.min, max: range.max });
                      onFilterChange({ minPrice: range.min, maxPrice: range.max });
                    }}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span className="text-xs text-slate-600">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brands Section */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => toggleSection("brands")}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          <span>Brands</span>
          {selectedBrands.length > 0 && (
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">{selectedBrands.length}</span>
          )}
          {openSection === "brands" ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
        </button>

        {openSection === "brands" && (
          <div className="max-h-60 space-y-1 overflow-y-auto border-t border-slate-100 p-3">
            {filterData?.brands?.map((brand) => (
              <label key={brand} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="h-4 w-4 rounded accent-blue-600"
                />
                <span className="text-sm text-slate-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {(filters.category || filters.minPrice || filters.maxPrice || selectedBrands.length > 0 || filters.search) && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          fullWidth
          leftIcon={<FiX />}
          onClick={() => {
            setSelectedBrands([]);
            setPriceRange({ min: "", max: "" });
            onClearFilters();
          }}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

export default ProductFilter;