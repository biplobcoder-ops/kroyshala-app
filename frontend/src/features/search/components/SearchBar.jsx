import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX, FiPackage, FiGrid, FiTag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/ui/Input/Input";
import useDebounce from "../../../hooks/useDebounce";
import {
  getSearchSuggestions,
  clearSuggestions,
} from "../store/searchSlice";

// ==========================================
// Search Bar Component
// ==========================================

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { suggestions, loading } = useSelector((state) => state.search);

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchRef = useRef(null);

  // ==========================================
  // Debounce দিয়ে API Call
  // ==========================================

  useEffect(() => {
    if (debouncedSearchTerm.trim().length >= 2) {
      dispatch(getSearchSuggestions(debouncedSearchTerm));
      setIsOpen(true);
    } else {
      dispatch(clearSuggestions());
      setIsOpen(false);
    }
  }, [debouncedSearchTerm, dispatch]);

  // ==========================================
  // Outside Click Close
  // ==========================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // ==========================================
  // Escape Key Close
  // ==========================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // ==========================================
  // Handlers
  // ==========================================

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    dispatch(clearSuggestions());
    setIsOpen(false);
  };

  const handleProductClick = (slug) => {
    setIsOpen(false);
    setSearchTerm("");
    navigate(`/products/${slug}`);
  };

  const handleCategoryClick = (slug) => {
    setIsOpen(false);
    setSearchTerm("");
    navigate(`/categories/${slug}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleChange}
          leftIcon={<FiSearch />}
          rightIcon={
            searchTerm ? (
              <button
                type="button"
                onClick={handleClear}
                className="cursor-pointer"
              >
                <FiX />
              </button>
            ) : null
          }
          className="!h-10"
        />
      </form>

      {/* ==========================================
          Suggestions Dropdown
      ========================================== */}

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
          {/* Loading */}
          {loading && (
            <div className="p-3 text-center text-sm text-slate-500">
              Searching...
            </div>
          )}

          {/* No Results */}
          {!loading &&
            suggestions.totalResults === 0 &&
            searchTerm.trim().length >= 2 && (
              <div className="p-3 text-center text-sm text-slate-500">
                No results found for "{searchTerm}"
              </div>
            )}

          {/* Products */}
          {suggestions.products?.length > 0 && (
            <div>
              <p className="px-4 py-2 text-xs font-semibold uppercase text-slate-400">
                Products
              </p>

              {suggestions.products.map((product) => (
                <button
                  key={product._id}
                  type="button"
                  onClick={() => handleProductClick(product.slug)}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left transition hover:bg-slate-50"
                >
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <FiPackage className="h-5 w-5 text-slate-400" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      ৳{product.discountPrice || product.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Categories */}
          {suggestions.categories?.length > 0 && (
            <div>
              <p className="px-4 py-2 text-xs font-semibold uppercase text-slate-400">
                Categories
              </p>

              {suggestions.categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => handleCategoryClick(category.slug)}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left transition hover:bg-slate-50"
                >
                  <FiGrid className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-900">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Brands */}
          {suggestions.brands?.length > 0 && (
            <div>
              <p className="px-4 py-2 text-xs font-semibold uppercase text-slate-400">
                Brands
              </p>

              {suggestions.brands.map((brand, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setSearchTerm("");
                    navigate(`/products?brand=${encodeURIComponent(brand)}`);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left transition hover:bg-slate-50"
                >
                  <FiTag className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-900">{brand}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;