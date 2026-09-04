const express = require("express");
const {
  handleSeedUser,
  handleSeedCategories,
  handleSeedProducts,
} = require("../controllers/seed.controllers");

const seedRouter = express.Router();

seedRouter.get("/users", handleSeedUser);
seedRouter.get("/categories", handleSeedCategories); // 🆕
seedRouter.get("/products", handleSeedProducts); // 🆕

module.exports = seedRouter;