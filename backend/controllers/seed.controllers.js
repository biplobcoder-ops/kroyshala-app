const User = require("../models/users.model");
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const bcrypt = require("bcryptjs")
const createError = require("http-errors");
const successResponse = require("../utils/successResponse");
const slugify = require("slugify");
const { seedUsers, seedCategories, seedProducts } = require("../data");

// ==========================================
// Seed Users
// ==========================================
const handleSeedUser = async (req, res, next) => {
  try {
    // Hash passwords
    const users = await Promise.all(
      seedUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          phone: user.phone,
          address: user.address,
          image: user.image, // ✅ image field (avatar না)
          role: user.role,
          isBanned: user.isBanned,
        };
      })
    );

    await User.deleteMany({
      email: { $in: users.map((user) => user.email) },
    });

    const createdUsers = await User.insertMany(users);

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
    next(error);
  }
};

// ==========================================
// Seed Categories
// ==========================================
const handleSeedCategories = async (req, res, next) => {
  try {
    await Category.deleteMany({
      name: { $in: seedCategories.map((cat) => cat.name) },
    });

    const categoriesWithSlug = seedCategories.map((cat) => ({
      name: cat.name,
      slug: slugify(cat.name, { lower: true, strict: true }),
      description: cat.description,
      image: cat.image,
      isActive: cat.isActive,
    }));

    const createdCategories = await Category.insertMany(categoriesWithSlug);

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
    next(error);
  }
};

// ==========================================
// Seed Products
// ==========================================
const handleSeedProducts = async (req, res, next) => {
  try {
    // Get all categories
    const categories = await Category.find({});

    if (!categories || categories.length === 0) {
      throw createError(400, "Categories not found. Please seed categories first.");
    }

    // Map category names to IDs
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Prepare products with category IDs
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
      isFeatured: product.isFeatured || false,
      isActive: product.isActive !== undefined ? product.isActive : true,
    }));

    // Check all categories exist
    for (const product of products) {
      if (!product.category) {
        throw createError(400, `Category not found for product: ${product.name}`);
      }
    }

    await Product.deleteMany({
      sku: { $in: products.map((product) => product.sku) },
    });

    const createdProducts = await Product.insertMany(products);

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
    next(error);
  }
};

module.exports = {
  handleSeedUser,
  handleSeedCategories,
  handleSeedProducts,
};