import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import Button from "../../../components/ui/Button/Button";
import ProductGrid from "../components/ProductGrid";
import HeroSlider from "../components/HeroSlider";
import { fetchProducts } from "../store/productSlice";
import { fetchCategories } from "../../categories/store/categorySlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 8, sort: "-createdAt" }));
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    // cart logic
    console.log("Add to cart:", product);
  };

  const handleAddToWishlist = (product) => {
    console.log("Add to wishlist:", product);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Hero Slider */}
      <HeroSlider categories={categories} />

      {/* Featured Products */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Hand-picked products for you
            </p>
          </div>
          <Link to="/products">
            <Button
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight />}
            >
              View All
            </Button>
          </Link>
        </div>

        <ProductGrid
          products={products}
          loading={loading}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      </div>
    </div>
  );
};

export default HomePage;