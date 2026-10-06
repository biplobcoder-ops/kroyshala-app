import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiAward,
  FiTag,
} from "react-icons/fi";
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
    console.log("Add to cart:", product);
  };

  const handleAddToWishlist = (product) => {
    console.log("Add to wishlist:", product);
  };

  const featuredProducts = products?.filter((p) => p.isFeatured) || [];
  const displayProducts =
    featuredProducts.length > 0 ? featuredProducts : products;

  return (
    <div className="bg-neutral-50">
      {/* ========== HERO SECTION ========== */}
      <div className="mx-auto max-w-[1280px] px-4 pt-6 sm:px-6 lg:px-8">
        <HeroSlider categories={categories} />
      </div>

      {/* ========== TRUST INDICATORS ========== */}
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {[
            {
              icon: <FiTruck />,
              title: "Free Delivery",
              desc: "On orders over ৳5000",
            },
            {
              icon: <FiRefreshCw />,
              title: "Easy Returns",
              desc: "7 days return policy",
            },
            {
              icon: <FiShield />,
              title: "Secure Payment",
              desc: "100% protected",
            },
            {
              icon: <FiHeadphones />,
              title: "24/7 Support",
              desc: "Always here for you",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-primary-200 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-lg text-primary-600">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== FEATURED CATEGORIES ========== */}
      {categories?.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl font-display">
              Shop by Category
            </h2>
            <Link to="/categories">
              <Button variant="ghost" size="sm" rightIcon={<FiArrowRight />}>
                All Categories
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={category.image?.url || "/placeholder.png"}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-sm font-semibold text-white">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ========== FEATURED PRODUCTS ========== */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl font-display">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Curated products for the modern lifestyle
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" size="sm" rightIcon={<FiArrowRight />}>
              View All
            </Button>
          </Link>
        </div>

        <ProductGrid
          products={displayProducts.slice(0, 8)}
          loading={loading}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      </section>

      {/* ========== PROMOTIONAL BANNER ========== */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-800 p-8 sm:p-12">
          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
              <FiTag className="h-3 w-3" />
              Limited Time Offer
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl font-display">
              Get up to 40% off on selected items
            </h2>
            <p className="mt-3 text-primary-50">
              Discover premium products across electronics, fashion, home
              essentials, and more — all at unbeatable prices.
            </p>
            <Link to="/products" className="mt-6 inline-block">
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<FiArrowRight />}
                className="!bg-white !text-primary-700 hover:!bg-neutral-100"
              >
                Shop Now
              </Button>
            </Link>
          </div>

          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-20 h-60 w-60 rounded-full bg-emerald-300/20 blur-3xl" />
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl font-display">
            Trusted by thousands of shoppers
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <FiAward />,
              title: "Premium Quality",
              desc: "Carefully curated products from trusted brands",
            },
            {
              icon: <FiTruck />,
              title: "Fast Delivery",
              desc: "Quick shipping across Bangladesh",
            },
            {
              icon: <FiShield />,
              title: "Secure Shopping",
              desc: "Your data and payments are protected",
            },
            {
              icon: <FiRefreshCw />,
              title: "Easy Returns",
              desc: "Hassle-free returns within 7 days",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-all hover:border-primary-200 hover:shadow-md"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-xl text-primary-600">
                {item.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-neutral-900">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
