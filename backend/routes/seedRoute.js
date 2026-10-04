const express = require("express");
const seedRouter = express.Router();

// ==========================================
// Lazy Require - Server start e crash hobe na
// Function call howar somoy controller load hobe
// ==========================================

seedRouter.post("/users", async (req, res, next) => {
  try {
    console.log("🌱 Route: /api/seed/users");
    const { handleSeedUser } = require("../controllers/seed.controllers");
    return await handleSeedUser(req, res, next);
  } catch (error) {
    console.error("❌ Route error (users):", error.message);
    next(error);
  }
});

seedRouter.post("/categories", async (req, res, next) => {
  try {
    console.log("🌱 Route: /api/seed/categories");
    const { handleSeedCategories } = require("../controllers/seed.controllers");
    return await handleSeedCategories(req, res, next);
  } catch (error) {
    console.error("❌ Route error (categories):", error.message);
    next(error);
  }
});

seedRouter.post("/products", async (req, res, next) => {
  try {
    console.log("🌱 Route: /api/seed/products");
    const { handleSeedProducts } = require("../controllers/seed.controllers");
    return await handleSeedProducts(req, res, next);
  } catch (error) {
    console.error("❌ Route error (products):", error.message);
    next(error);
  }
});

module.exports = seedRouter;
