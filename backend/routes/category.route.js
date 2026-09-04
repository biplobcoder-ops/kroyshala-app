const express = require("express");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/upload");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validators/category.validation");
const {
  handleCreateCategory,
  handleGetCategories,
  handleGetSingleCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} = require("../controllers/category.controller");

const categoryRouter = express.Router();

// Public routes
categoryRouter.get("/", handleGetCategories);
categoryRouter.get("/:slug", handleGetSingleCategory);

// Admin routes
categoryRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  validate(createCategorySchema),
  handleCreateCategory
);

categoryRouter.put(
  "/:id",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  validate(updateCategorySchema),
  handleUpdateCategory
);

categoryRouter.delete(
  "/:id",
  isLoggedIn,
  isAdmin,
  handleDeleteCategory
);

module.exports = categoryRouter;