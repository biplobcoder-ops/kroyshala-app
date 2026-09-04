const {
  dashboardOverviewService,
  monthlySalesStatisticsService,
  orderStatisticsService,
  revenueStatisticsService,
  salesAnalyticsService,
  revenueAnalyticsService,
  productPerformanceService,
  customerAnalyticsService,
  orderStatusAnalyticsService,
  userManagementService,
  deleteUserService,
  banUserService,
  unbanUserService,
} = require("../services/dashboard.service");
const successResponse = require("../utils/successResponse");

// ==========================================
// 37. Dashboard Overview
// ==========================================
const handleDashboardOverview = async (req, res, next) => {
  try {
    const result = await dashboardOverviewService();

    return successResponse(res, {
      statusCode: 200,
      message: "Dashboard overview fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 38. Monthly Sales Statistics
// ==========================================
const handleMonthlySalesStatistics = async (req, res, next) => {
  try {
    const result = await monthlySalesStatisticsService();

    return successResponse(res, {
      statusCode: 200,
      message: "Monthly sales statistics fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 39. Order Statistics
// ==========================================
const handleOrderStatistics = async (req, res, next) => {
  try {
    const result = await orderStatisticsService();

    return successResponse(res, {
      statusCode: 200,
      message: "Order statistics fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 40. Revenue Statistics
// ==========================================
const handleRevenueStatistics = async (req, res, next) => {
  try {
    const result = await revenueStatisticsService();

    return successResponse(res, {
      statusCode: 200,
      message: "Revenue statistics fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 41. Sales Analytics
// ==========================================
const handleSalesAnalytics = async (req, res, next) => {
  try {
    const result = await salesAnalyticsService(req.query);

    return successResponse(res, {
      statusCode: 200,
      message: "Sales analytics fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 42. Revenue Analytics
// ==========================================
const handleRevenueAnalytics = async (req, res, next) => {
  try {
    const result = await revenueAnalyticsService(req.query);

    return successResponse(res, {
      statusCode: 200,
      message: "Revenue analytics fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 43. Product Performance Analytics
// ==========================================
const handleProductPerformanceAnalytics = async (req, res, next) => {
  try {
    const result = await productPerformanceService();

    return successResponse(res, {
      statusCode: 200,
      message: "Product performance analytics fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 44. Customer Analytics
// ==========================================
const handleCustomerAnalytics = async (req, res, next) => {
  try {
    const result = await customerAnalyticsService();

    return successResponse(res, {
      statusCode: 200,
      message: "Customer analytics fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 45. Order Status Analytics
// ==========================================
const handleOrderStatusAnalytics = async (req, res, next) => {
  try {
    const result = await orderStatusAnalyticsService();

    return successResponse(res, {
      statusCode: 200,
      message: "Order status analytics fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// User Management
// ==========================================
const handleUserManagement = async (req, res, next) => {
  try {
    const result = await userManagementService(req.query);

    return successResponse(res, {
      statusCode: 200,
      message: "Users fetched successfully.",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Delete User
// ==========================================
const handleDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteUserService(id);

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Ban User
// ==========================================
const handleBanUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await banUserService(id);

    return successResponse(res, {
      statusCode: 200,
      message: "User banned successfully.",
      payload: { user: result },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Unban User
// ==========================================
const handleUnbanUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await unbanUserService(id);

    return successResponse(res, {
      statusCode: 200,
      message: "User unbanned successfully.",
      payload: { user: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};