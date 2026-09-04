const Product = require("../models/product.model");
const Category = require("../models/category.model");
const createError = require("http-errors");
const { setCache, getCache } = require("../utils/redis");

// ==========================================
// Search Suggestions Service (with Cache)
// ==========================================

const searchSuggestionsService = async (searchTerm) => {
  // Validation
  if (!searchTerm || searchTerm.trim().length < 2) {
    return {
      products: [],
      categories: [],
      brands: [],
      totalResults: 0,
    };
  }

  const normalizedTerm = searchTerm.trim().toLowerCase();
  const cacheKey = `search:${normalizedTerm}`;

  // Cache check
  const cachedResult = await getCache(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }

  const searchRegex = new RegExp(searchTerm.trim(), "i");

  // Products Search (Popularity Ranking)
  const products = await Product.find({
    isActive: true,
    $or: [
      { name: searchRegex },
      { brand: searchRegex },
      { tags: searchRegex },
    ],
  })
    .select("name slug images price discountPrice stock soldCount rating")
    .sort({ soldCount: -1, rating: -1, createdAt: -1 })
    .limit(10);

  // Categories Search
  const categories = await Category.find({
    isActive: true,
    name: searchRegex,
  })
    .select("name slug image")
    .limit(5);

  // Brands Search (Unique)
  const brands = await Product.distinct("brand", {
    brand: searchRegex,
    isActive: true,
  });

  const result = {
    products,
    categories,
    brands: brands.slice(0, 5),
    totalResults: products.length + categories.length + brands.length,
  };

  // Cache save (5 minutes)
  await setCache(cacheKey, result, 300);

  return result;
};

// ==========================================
// Related Products Service (with Cache)
// ==========================================

const relatedProductsService = async (productId) => {
  const cacheKey = `products:related:${productId}`;

  // Cache check
  const cachedProducts = await getCache(cacheKey);
  if (cachedProducts) {
    return cachedProducts;
  }

  // Current product find
  const product = await Product.findById(productId);

  if (!product) {
    throw createError(404, "Product not found.");
  }

  // Related products (Same category or brand or tags)
  const relatedProducts = await Product.find({
    _id: { $ne: productId },
    isActive: true,
    $or: [
      { category: product.category },
      { brand: product.brand },
      { tags: { $in: product.tags || [] } },
    ],
  })
    .populate("category", "name slug")
    .select("name slug images price discountPrice stock rating soldCount")
    .sort({ soldCount: -1, rating: -1 })
    .limit(8);

  // Cache save (15 minutes)
  await setCache(cacheKey, relatedProducts, 900);

  return relatedProducts;
};

module.exports = {
  searchSuggestionsService,
  relatedProductsService,
};