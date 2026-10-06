import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiMinus,
  FiPlus,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiChevronRight,
  FiPackage,
  FiCheck,
} from "react-icons/fi";
import Button from "../../../components/ui/Button/Button";
import Badge from "../../../components/ui/Badge/Badge";
import { fetchSingleProduct } from "../store/productSlice";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (slug) dispatch(fetchSingleProduct(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedImage(0);
    setQuantity(1);
  }, [slug]);

  // Loading
  if (loading || !product) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square skeleton rounded-2xl" />
          <div className="space-y-4">
            <div className="skeleton h-6 w-32 rounded" />
            <div className="skeleton h-8 w-full rounded" />
            <div className="skeleton h-4 w-24 rounded" />
            <div className="skeleton h-10 w-40 rounded" />
            <div className="skeleton h-24 w-full rounded" />
          </div>
        </div>
      </div>
    );
  }

  const price =
    product.discountPrice > 0 ? product.discountPrice : product.price;
  const discountPercent =
    product.discountPrice > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100
        )
      : 0;

  const isOutOfStock = product.stock === 0;

  const handleQuantityChange = (delta) => {
    setQuantity((q) => Math.max(1, Math.min(product.stock || 1, q + delta)));
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", { product, quantity });
  };

  const handleBuyNow = () => {
    console.log("Buy now:", { product, quantity });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
        {/* ========== BREADCRUMB ========== */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-neutral-500">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <FiChevronRight className="h-3 w-3" />
          <Link
            to="/products"
            className="hover:text-primary-600 transition-colors"
          >
            Products
          </Link>
          {product.category && (
            <>
              <FiChevronRight className="h-3 w-3" />
              <Link
                to={`/categories/${product.category.slug}`}
                className="hover:text-primary-600 transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <FiChevronRight className="h-3 w-3" />
          <span className="truncate font-medium text-neutral-900">
            {product.name}
          </span>
        </nav>

        {/* ========== MAIN PRODUCT SECTION ========== */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ---------- IMAGE GALLERY ---------- */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <img
                src={
                  product.images?.[selectedImage]?.url ||
                  product.images?.[0]?.url ||
                  "/placeholder.png"
                }
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {discountPercent > 0 && (
                <span className="absolute left-4 top-4 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                  -{discountPercent}% Off
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === i
                        ? "border-primary-600 ring-2 ring-primary-100"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------- PRODUCT INFO ---------- */}
          <div>
            {/* Category + Brand */}
            <div className="flex items-center gap-3 text-xs">
              {product.category && (
                <Link
                  to={`/categories/${product.category.slug}`}
                  className="font-semibold uppercase tracking-wider text-primary-600 hover:text-primary-700"
                >
                  {product.category.name}
                </Link>
              )}
              {product.brand && (
                <span className="text-neutral-500">• {product.brand}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl font-display">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-neutral-900">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-sm text-neutral-500">
                  ({product.numReviews || 0} reviews)
                </span>
              </div>
            )}

            {/* SKU */}
            {product.sku && (
              <p className="mt-3 text-xs text-neutral-500">
                SKU: <span className="font-medium text-neutral-700">{product.sku}</span>
              </p>
            )}

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-neutral-900">
                ৳{price}
              </span>
              {product.discountPrice > 0 && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    ৳{product.price}
                  </span>
                  <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                    Save ৳{product.price - product.discountPrice}
                  </span>
                </>
              )}
            </div>

            {/* Stock status */}
            <div className="mt-4 flex items-center gap-2">
              {isOutOfStock ? (
                <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Out of Stock
                </span>
              ) : (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <FiCheck className="h-3.5 w-3.5" />
                  In Stock ({product.stock} available)
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-neutral-600">
              {product.description}
            </p>

            {/* Quantity + Actions */}
            {!isOutOfStock && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-neutral-700">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
                    >
                      <FiMinus className="h-3.5 w-3.5" />
                    </button>
                    <span className="flex h-8 min-w-[40px] items-center justify-center text-sm font-semibold text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
                    >
                      <FiPlus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    leftIcon={<FiShoppingCart />}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                  <button
                    type="button"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    aria-label="Add to wishlist"
                  >
                    <FiHeart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-neutral-200 pt-6">
              {[
                { icon: <FiTruck />, label: "Free Delivery" },
                { icon: <FiShield />, label: "Secure Payment" },
                { icon: <FiRefreshCw />, label: "7 Days Return" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-medium text-neutral-600">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== TABS SECTION ========== */}
        <div className="mt-12 rounded-2xl border border-neutral-200 bg-white">
          <div className="flex border-b border-neutral-200">
            {[
              { key: "description", label: "Description" },
              { key: "specifications", label: "Specifications" },
              { key: "reviews", label: `Reviews (${product.numReviews || 0})` },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "text-primary-600"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Description Tab */}
            {activeTab === "description" && (
              <div className="prose prose-sm max-w-none text-neutral-700">
                <p className="leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(product.specifications || {}).map(([key, value]) =>
                  value ? (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                        {key}
                      </span>
                      <span className="text-sm font-medium text-neutral-900">
                        {value}
                      </span>
                    </div>
                  ) : null
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="text-center py-8">
                <FiPackage className="mx-auto h-10 w-10 text-neutral-300" />
                <p className="mt-3 text-sm text-neutral-500">
                  {product.numReviews > 0
                    ? "Reviews loading..."
                    : "No reviews yet. Be the first to review!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
