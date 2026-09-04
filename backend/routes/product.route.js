const express = require("express");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/upload");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/product.validation");
const {
  handleCreateProduct,
  handleGetProducts,
  handleGetProductFilters,
  handleGetSingleProduct,
  handleUpdateProduct,
  handleDeleteProduct,
} = require("../controllers/product.controller");

const productRouter = express.Router();

// ==========================================
// Public routes
// ==========================================

// Get Product Filters (Must be before /:slug)
productRouter.get("/filters", handleGetProductFilters);

// Get All Products
productRouter.get("/", handleGetProducts);

// Get Single Product
productRouter.get("/:slug", handleGetSingleProduct);

// ==========================================
// Admin routes
// ==========================================

productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.array("images", 5),
  validate(createProductSchema),
  handleCreateProduct
);

productRouter.put(
  "/:id",
  isLoggedIn,
  isAdmin,
  upload.array("images", 5),
  validate(updateProductSchema),
  handleUpdateProduct
);

productRouter.delete(
  "/:id",
  isLoggedIn,
  isAdmin,
  handleDeleteProduct
);

module.exports = productRouter;