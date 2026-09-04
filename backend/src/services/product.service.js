const Product = require("../models/product.model");
const Category = require("../models/category.model");
const createError = require("http-errors");
const slugify = require("slugify");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");
const { setCache, getCache, deleteCache, deleteCacheByPattern } = require("../utils/redis");

// ==========================================
// Create Product Service
// ==========================================

const createProductService = async (productData, files) => {
  const {
    name,
    description,
    price,
    discountPrice,
    brand,
    sku,
    category,
    stock,
    tags,
    specifications,
    isFeatured,
  } = productData;

  // Image required check
  if (!files || files.length === 0) {
    throw createError(400, "At least one product image is required.");
  }

  // Slug generate
  const slug = slugify(name, { lower: true, strict: true });

  // Check if slug exists
  const existingProduct = await Product.findOne({ slug });
  if (existingProduct) {
    throw createError(409, "Product with this name already exists.");
  }

  // Check if SKU exists
  const existingSku = await Product.findOne({ sku });
  if (existingSku) {
    throw createError(409, "Product with this SKU already exists.");
  }

  // Check if category exists
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    throw createError(404, "Category not found.");
  }

  // Upload images to Cloudinary
  let images = [];
  for (const file of files) {
    const result = await uploadToCloudinary(file.buffer, "kroyshala/products");
    images.push({
      public_id: result.public_id,
      url: result.url,
    });
  }

  // Create product
  const product = await Product.create({
    name,
    slug,
    description,
    price: Number(price),
    discountPrice: discountPrice ? Number(discountPrice) : 0,
    brand: brand || "",
    sku,
    category,
    images,
    stock: Number(stock),
    tags: tags || [],
    specifications: specifications || {},
    isFeatured: isFeatured || false,
    isActive: true,
  });

  // Populate category
  await product.populate("category", "name slug");

  // Cache clear - new product add হলে
  await deleteCacheByPattern("products:list:*");
  await deleteCacheByPattern("products:filters");
  await deleteCacheByPattern("search:*");
  await deleteCache("dashboard:overview");

  return product;
};

// ==========================================
// Get Product Filters Service (with Cache)
// ==========================================

const getProductFiltersService = async () => {
  // Cache check
  const cachedFilters = await getCache("products:filters");
  if (cachedFilters) {
    return cachedFilters;
  }

  // Get all unique brands
  const brands = await Product.distinct("brand", {
    isActive: true,
    brand: { $ne: "" },
  });

  // Get price range
  const priceRange = await Product.aggregate([
    {
      $match: { isActive: true },
    },
    {
      $group: {
        _id: null,
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);

  // Get all categories
  const categories = await Category.find({ isActive: true })
    .select("name slug")
    .sort({ name: 1 });

  const result = {
    brands,
    priceRange: priceRange.length > 0 ? priceRange[0] : { minPrice: 0, maxPrice: 100000 },
    categories,
  };

  // Cache save (30 minutes)
  await setCache("products:filters", result, 1800);

  return result;
};

// ==========================================
// Get All Products Service (with Cache)
// ==========================================

const getProductsService = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    category = "",
    minPrice = "",
    maxPrice = "",
    brand = "",
    sort = "-createdAt",
  } = query;

  // Cache key build
  const cacheKey = `products:list:${page}:${limit}:${search}:${category}:${minPrice}:${maxPrice}:${brand}:${sort}`;

  // Cache check (only for first page without filters)
  const isSimpleQuery = !search && !category && !minPrice && !maxPrice && !brand && sort === "-createdAt";

  if (isSimpleQuery && page === 1) {
    const cachedProducts = await getCache(cacheKey);
    if (cachedProducts) {
      return cachedProducts;
    }
  }

  // Filter object build
  const filter = { isActive: true };

  // Search by name or brand or tags
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by category
  if (category) {
    const categoryData = await Category.findOne({ slug: category });
    if (categoryData) {
      filter.category = categoryData._id;
    }
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Filter by brand (multiple brands support)
  if (brand) {
    const brands = brand.split(",");
    filter.brand = { $in: brands };
  }

  // Pagination
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  // Get products
  const products = await Product.find(filter)
    .populate("category", "name slug")
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  // Total count
  const total = await Product.countDocuments(filter);

  const result = {
    products,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
  };

  // Cache save (5 minutes) - only simple query
  if (isSimpleQuery && page === 1) {
    await setCache(cacheKey, result, 300);
  }

  return result;
};

// ==========================================
// Get Single Product Service (with Cache)
// ==========================================

const getSingleProductService = async (slug) => {
  // Cache check
  const cachedProduct = await getCache(`products:${slug}`);
  if (cachedProduct) {
    return cachedProduct;
  }

  // Database query
  const product = await Product.findOne({ slug, isActive: true }).populate(
    "category",
    "name slug"
  );

  if (!product) {
    throw createError(404, "Product not found.");
  }

  // Cache save (10 minutes)
  await setCache(`products:${slug}`, product, 600);

  return product;
};

// ==========================================
// Update Product Service (with Cache Delete)
// ==========================================

const updateProductService = async (productId, updateData, files) => {
  // Find product
  const product = await Product.findById(productId);

  if (!product) {
    throw createError(404, "Product not found.");
  }

  const oldSlug = product.slug;

  // Basic info update
  if (updateData.name) {
    product.name = updateData.name;
    product.slug = slugify(updateData.name, { lower: true, strict: true });
  }

  if (updateData.description) product.description = updateData.description;
  if (updateData.price) product.price = Number(updateData.price);
  if (updateData.discountPrice !== undefined) product.discountPrice = Number(updateData.discountPrice);
  if (updateData.brand !== undefined) product.brand = updateData.brand;
  if (updateData.stock !== undefined) product.stock = Number(updateData.stock);
  if (updateData.category) product.category = updateData.category;
  if (updateData.tags) product.tags = updateData.tags;
  if (updateData.isFeatured !== undefined) product.isFeatured = updateData.isFeatured;
  if (updateData.isActive !== undefined) product.isActive = updateData.isActive;

  // New images upload
  if (files && files.length > 0) {
    for (const image of product.images) {
      await deleteFromCloudinary(image.public_id);
    }

    let newImages = [];
    for (const file of files) {
      const result = await uploadToCloudinary(file.buffer, "kroyshala/products");
      newImages.push({
        public_id: result.public_id,
        url: result.url,
      });
    }
    product.images = newImages;
  }

  // Save
  await product.save();
  await product.populate("category", "name slug");

  // Cache delete
  await deleteCache(`products:${oldSlug}`);
  await deleteCache(`products:${product.slug}`);
  await deleteCacheByPattern("products:list:*");
  await deleteCache("products:filters");
  await deleteCacheByPattern("search:*");
  await deleteCacheByPattern(`products:related:${product._id}`);
  await deleteCache("dashboard:overview");

  return product;
};

// ==========================================
// Delete Product Service (with Cache Delete)
// ==========================================

const deleteProductService = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw createError(404, "Product not found.");
  }

  const productSlug = product.slug;

  // Delete all images from cloudinary
  for (const image of product.images) {
    await deleteFromCloudinary(image.public_id);
  }

  // Delete product
  await Product.findByIdAndDelete(productId);

  // Cache delete
  await deleteCache(`products:${productSlug}`);
  await deleteCacheByPattern("products:list:*");
  await deleteCache("products:filters");
  await deleteCacheByPattern("search:*");
  await deleteCacheByPattern(`products:related:${productId}`);
  await deleteCache("dashboard:overview");

  return { message: "Product deleted successfully." };
};

module.exports = {
  createProductService,
  getProductsService,
  getProductFiltersService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
};