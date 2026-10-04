const express = require("express");
const {
  handleSeedUser,
  handleSeedCategories,
  handleSeedProducts,
} = require("../controllers/seed.controllers");

const seedRouter = express.Router();

// ✅ POST methods use koro (seed create data)
seedRouter.post("/users", handleSeedUser);
seedRouter.post("/categories", handleSeedCategories);
seedRouter.post("/products", handleSeedProducts);

module.exports = seedRouter;
