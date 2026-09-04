const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const {
  handleDashboardOverview,
  handleMonthlySalesStatistics,
  handleOrderStatistics,
  handleRevenueStatistics,
  handleSalesAnalytics,
  handleRevenueAnalytics,
  handleProductPerformanceAnalytics,
  handleCustomerAnalytics,
  handleOrderStatusAnalytics,
  handleUserManagement,
  handleDeleteUser,
  handleBanUser,
  handleUnbanUser,
} = require("../controllers/dashboard.controller");

const dashboardRouter = express.Router();

// সব routes admin only
dashboardRouter.use(isLoggedIn, isAdmin);

// Overview
dashboardRouter.get("/overview", handleDashboardOverview);

// Statistics
dashboardRouter.get("/monthly-sales", handleMonthlySalesStatistics);
dashboardRouter.get("/order-statistics", handleOrderStatistics);
dashboardRouter.get("/revenue-statistics", handleRevenueStatistics);

// Analytics
dashboardRouter.get("/sales-analytics", handleSalesAnalytics);
dashboardRouter.get("/revenue-analytics", handleRevenueAnalytics);
dashboardRouter.get("/product-performance", handleProductPerformanceAnalytics);
dashboardRouter.get("/customer-analytics", handleCustomerAnalytics);
dashboardRouter.get("/order-status-analytics", handleOrderStatusAnalytics);

// User Management
dashboardRouter.get("/users", handleUserManagement);
dashboardRouter.delete("/users/:id", handleDeleteUser);
dashboardRouter.put("/users/:id/ban", handleBanUser);
dashboardRouter.put("/users/:id/unban", handleUnbanUser);

module.exports = dashboardRouter;