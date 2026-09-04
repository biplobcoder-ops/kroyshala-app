// backend/src/routes/order.route.js
const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const {
  handleCreateOrder,
  handleGetMyOrders,
  handleGetSingleOrder,
  handleCancelOrder,
  handleGetAllOrders,
  handleUpdateOrderStatus,
  handleConfirmOrder,
  handleGetSingleOrderAdmin,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

// User routes
orderRouter.post("/create", isLoggedIn, handleCreateOrder);
orderRouter.get("/my-orders", isLoggedIn, handleGetMyOrders);
orderRouter.get("/:id", isLoggedIn, handleGetSingleOrder);
orderRouter.put("/:id/cancel", isLoggedIn, handleCancelOrder);
orderRouter.put("/:id/confirm", isLoggedIn, handleConfirmOrder);

// Admin routes
orderRouter.get("/admin/all", isLoggedIn, isAdmin, handleGetAllOrders);
orderRouter.get("/admin/:id", isLoggedIn, isAdmin, handleGetSingleOrderAdmin);
orderRouter.put("/admin/:id/status", isLoggedIn, isAdmin, handleUpdateOrderStatus);

module.exports = orderRouter;