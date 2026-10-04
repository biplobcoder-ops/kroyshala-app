// ==========================================
// SEED CONTROLLERS
// Users, Categories, Products seed logic
// Vercel-compatible with debug logs
// ==========================================

// 🔍 DEBUG: Import tracking
console.log("🔍 [seed.controllers.js] File loading started...");

let User, Category, Product, bcrypt, createError, successResponse, slugify;
let seedUsers, seedCategories, seedProducts;

try {
  console.log("📦 Loading User model...");
  User = require("../models/users.model");

  console.log("📦 Loading Category model...");
  Category = require("../models/category.model");

  console.log("📦 Loading Product model...");
  Product = require("../models/product.model");

  console.log("📦 Loading bcryptjs...");
  bcrypt = require("bcryptjs");

  console.log("📦 Loading http-errors...");
  createError = require("http-errors");

  console.log("📦 Loading successResponse util...");
  successResponse = require("../utils/successResponse");

  console.log("📦 Loading slugify...");
  slugify = require("slugify");

  console.log("📦 Loading data.js (LARGE FILE)...");
  const data = require("../data");
  seedUsers = data.seedUsers;
  seedCategories = data.seedCategories;
  seedProducts = data.seedProducts;

  console.log("✅ [seed.controllers.js] All imports loaded successfully");
  console.log("📊 Counts:", {
    users: seedUsers?.length || 0,
    categories: seedCategories?.length || 0,
    products: seedProducts?.length || 0,
  });
} catch (error) {
  console.error("❌ [seed.controllers.js] IMPORT ERROR:", error.message);
  console.error("❌ Stack:", error.stack);
  throw error;
}

// ==========================================
// Seed Users
// ==========================================
const handleSeedUser = async (req, res, next) => {
  try {
    console.log("👤 [handleSeedUser] Started");

    // Hash passwords
    console.log("🔐 Hashing passwords...");
    const users = await Promise.all(
      seedUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          phone: user.phone,
          address: user.address,
          image: user.image,
          role: user.role,
          isBanned: user.isBanned,
        };
      })
    );

    console.log(`🗑️  Deleting existing users...`);
    await User.deleteMany({
      email: { $in: users.map((user) => user.email) },
    });

    console.log("➕ Inserting new users...");
    const createdUsers = await User.insertMany(users);

    console.log(`✅ Created ${createdUsers.length} users`);

    return successResponse(res, {
      statusCode: 201,
      message: "Seed users created successfully",
      payload: {
        count: createdUsers.length,
        users: createdUsers.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isBanned: user.isBanned,
          image: user.image,
        })),
      },
    });
  } catch (error) {
    console.error("❌ [handleSeedUser] Error:", error.message);
    console.error("❌ Stack:", error.stack);
    next(error);
  }
};

// ==========================================
// Seed Categories
// ==========================================
const handleSeedCategories = async (req, res, next) => {
  try {
    console.log("📁 [handleSeedCategories] Started");

    console.log("🗑️  Deleting existing categories...");
    await Category.deleteMany({
      name: { $in: seedCategories.map((cat) => cat.name) },
    });

    console.log("🔧 Preparing categories with slugs...");
    const categoriesWithSlug = seedCategories.map((cat) => ({
      name: cat.name,
      slug: slugify(cat.name, { lower: true, strict: true }),
      description: cat.description,
      image: cat.image,
      isActive: cat.isActive,
    }));

    console.log("➕ Inserting categories...");
    const createdCategories = await Category.insertMany(categoriesWithSlug);

    console.log(`✅ Created ${createdCategories.length} categories`);

    return successResponse(res, {
      statusCode: 201,
      message: "Seed categories created successfully",
      payload: {
        count: createdCategories.length,
        categories: createdCategories.map((cat) => ({
          id: cat._id,
          name: cat.name,
          slug: cat.slug,
          image: cat.image,
        })),
      },
    });
  } catch (error) {
    console.error("❌ [handleSeedCategories] Error:", error.message);
    console.error("❌ Stack:", error.stack);
    next(error);
  }
};

// ==========================================
// Seed Products
// ==========================================
const handleSeedProducts = async (req, res, next) => {
  try {
    console.log("📦 [handleSeedProducts] Started");

    // Get all categories
    console.log("🔍 Fetching categories...");
    const categories = await Category.find({});

    if (!categories || categories.length === 0) {
      throw createError(400, "Categories not found. Please seed categories first.");
    }

    console.log(`✅ Found ${categories.length} categories`);

    // Map category names to IDs
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Prepare products with category IDs
    console.log("🔧 Preparing products...");
    const products = seedProducts.map((product) => ({
      name: product.name,
      slug: slugify(product.name, { lower: true, strict: true }),
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice,
      brand: product.brand,
      sku: product.sku,
      category: categoryMap[product.category],
      images: product.images,
      stock: product.stock,
      tags: product.tags || [],
      specifications: product.specifications || {},
      rating: product.rating || 0,
      numReviews: product.numReviews || 0,
      soldCount: product.soldCount || 0,
      isFeatured: product.isFeatured || false,
      isActive: product.isActive !== undefined ? product.isActive : true,
    }));

    // Check all categories exist
    for (const product of products) {
      if (!product.category) {
        throw createError(400, `Category not found for product: ${product.name}`);
      }
    }

    console.log(`🗑️  Deleting existing products (${products.length} SKUs)...`);
    await Product.deleteMany({
      sku: { $in: products.map((product) => product.sku) },
    });

    console.log(`➕ Inserting ${products.length} products...`);
    const createdProducts = await Product.insertMany(products);

    console.log(`✅ Created ${createdProducts.length} products`);

    return successResponse(res, {
      statusCode: 201,
      message: "Seed products created successfully",
      payload: {
        count: createdProducts.length,
        products: createdProducts.map((product) => ({
          id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          discountPrice: product.discountPrice,
          category: product.category,
          images: product.images,
        })),
      },
    });
  } catch (error) {
    console.error("❌ [handleSeedProducts] Error:", error.message);
    console.error("❌ Stack:", error.stack);
    next(error);
  }
};

// ==========================================
// Exports
// ==========================================
module.exports = {
  handleSeedUser,
  handleSeedCategories,
  handleSeedProducts,
};
