const Category = require("../models/category.model");
const createError = require("http-errors");
const slugify = require("slugify");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");
const { setCache, getCache, deleteCache, deleteCacheByPattern } = require("../utils/redis");

// ==========================================
// Create Category Service (with Cache Delete)
// ==========================================

const createCategoryService = async (categoryData, file) => {
  const { name, description } = categoryData;

  // Slug generate
  const slug = slugify(name, { lower: true, strict: true });

  // Check if slug exists
  const existingCategory = await Category.findOne({ slug });
  if (existingCategory) {
    throw createError(409, "Category with this name already exists.");
  }

  // Image upload (যদি থাকে)
  let image = { public_id: "", url: "" };
  if (file) {
    const result = await uploadToCloudinary(file.buffer, "kroyshala/categories");
    image = {
      public_id: result.public_id,
      url: result.url,
    };
  }

  // Create category
  const category = await Category.create({
    name,
    slug,
    description: description || "",
    image,
    isActive: true,
  });

  // Cache delete
  await deleteCache("categories:all");
  await deleteCache("products:filters");
  await deleteCache("dashboard:overview");

  return category;
};

// ==========================================
// Get All Categories Service (with Cache)
// ==========================================

const getCategoriesService = async () => {
  // Cache check
  const cachedCategories = await getCache("categories:all");
  if (cachedCategories) {
    return cachedCategories;
  }

  // Database query
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });

  // Cache save (1 hour)
  await setCache("categories:all", categories, 3600);

  return categories;
};

// ==========================================
// Get Single Category Service (with Cache)
// ==========================================

const getSingleCategoryService = async (slug) => {
  // Cache check
  const cachedCategory = await getCache(`categories:${slug}`);
  if (cachedCategory) {
    return cachedCategory;
  }

  // Database query
  const category = await Category.findOne({ slug, isActive: true });

  if (!category) {
    throw createError(404, "Category not found.");
  }

  // Cache save (30 minutes)
  await setCache(`categories:${slug}`, category, 1800);

  return category;
};

// ==========================================
// Update Category Service (with Cache Delete)
// ==========================================

const updateCategoryService = async (categoryId, updateData, file) => {
  // Category find
  const category = await Category.findById(categoryId);

  if (!category) {
    throw createError(404, "Category not found.");
  }

  const oldSlug = category.slug;

  // Name update + slug regenerate
  if (updateData.name) {
    category.name = updateData.name;
    category.slug = slugify(updateData.name, { lower: true, strict: true });
  }

  // Description update
  if (updateData.description !== undefined) {
    category.description = updateData.description;
  }

  // Active status update
  if (updateData.isActive !== undefined) {
    category.isActive = updateData.isActive;
  }

  // Image update
  if (file) {
    if (category.image.public_id) {
      await deleteFromCloudinary(category.image.public_id);
    }

    const result = await uploadToCloudinary(file.buffer, "kroyshala/categories");
    category.image = {
      public_id: result.public_id,
      url: result.url,
    };
  }

  // Save
  await category.save();

  // Cache delete
  await deleteCache("categories:all");
  await deleteCache(`categories:${oldSlug}`);
  await deleteCache(`categories:${category.slug}`);
  await deleteCache("products:filters");
  await deleteCacheByPattern("products:list:*");
  await deleteCache("dashboard:overview");

  return category;
};

// ==========================================
// Delete Category Service (with Cache Delete)
// ==========================================

const deleteCategoryService = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw createError(404, "Category not found.");
  }

  const categorySlug = category.slug;

  // Image delete from cloudinary
  if (category.image.public_id) {
    await deleteFromCloudinary(category.image.public_id);
  }

  // Delete category
  await Category.findByIdAndDelete(categoryId);

  // Cache delete
  await deleteCache("categories:all");
  await deleteCache(`categories:${categorySlug}`);
  await deleteCache("products:filters");
  await deleteCacheByPattern("products:list:*");
  await deleteCache("dashboard:overview");

  return { message: "Category deleted successfully." };
};

module.exports = {
  createCategoryService,
  getCategoriesService,
  getSingleCategoryService,
  updateCategoryService,
  deleteCategoryService,
};