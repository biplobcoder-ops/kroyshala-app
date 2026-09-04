import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button/Button";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import {
  fetchProducts,
  setFilters,
  clearFilters,
} from "../store/productSlice";
import { addToCart } from "../../cart/store/cartSlice";
import { addToWishlist } from "../../wishlist/store/wishlistSlice";

const ShopPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams(); // ✅ category slug

  const { products, loading, error, pagination, filters } = useSelector(
    (state) => state.products
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ URL-এ slug থাকলে filter category set
  useEffect(() => {
    if (slug) {
      dispatch(setFilters({ category: slug }));
      setCurrentPage(1);
    }
  }, [slug, dispatch]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        limit: 12,
        ...filters,
      })
    );
  }, [dispatch, currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to cart");
      navigate("/login", { state: { from: "/products" } });
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => toast.success("Product added to cart!"))
      .catch((error) => toast.error(error || "Failed to add to cart"));
  };

  const handleAddToWishlist = (product) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      navigate("/login", { state: { from: "/products" } });
      return;
    }
    dispatch(addToWishlist(product._id))
      .unwrap()
      .then(() => toast.success("Product added to wishlist!"))
      .catch((error) => toast.error(error || "Failed to add to wishlist"));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {slug ? `Category: ${slug}` : "Products"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {pagination.total || 0} products found
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={<FiFilter />}
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden"
        >
          Filters
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {showFilters && (
            <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 md:hidden">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">Filters</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  rounded="full"
                  className="!h-8 !w-8 !p-0"
                  onClick={() => setShowFilters(false)}
                >
                  <FiX className="h-4 w-4" />
                </Button>
              </div>
              <ProductFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <ProductGrid
            products={products}
            loading={loading}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />

          {pagination.pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: pagination.pages }, (_, index) => (
                <Button
                  key={index + 1}
                  type="button"
                  variant={currentPage === index + 1 ? "primary" : "outline"}
                  size="sm"
                  rounded="lg"
                  className="!h-10 !w-10"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;