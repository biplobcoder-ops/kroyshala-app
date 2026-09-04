const User = require("../models/users.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const Category = require("../models/category.model");
const Review = require("../models/review.model");
const Cart = require("../models/cart.model");
const Wishlist = require("../models/wishlist.model");
const createError = require("http-errors");
const withTransaction = require("../utils/transaction");
const { setCache, getCache, deleteCache } = require("../utils/redis");

// ==========================================
// Dashboard Overview (with Cache)
// ==========================================

const dashboardOverviewService = async () => {
  // Cache check
  const cachedData = await getCache("dashboard:overview");
  if (cachedData) {
    return cachedData;
  }

  // Database query
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalCategories = await Category.countDocuments();

  const totalRevenue = await Order.aggregate([
    {
      $match: { orderStatus: { $ne: "cancelled" } },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  const result = {
    totalUsers,
    totalProducts,
    totalOrders,
    totalCategories,
    totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0,
  };

  // Cache save (5 minutes)
  await setCache("dashboard:overview", result, 300);

  return result;
};

// ==========================================
// Monthly Sales Statistics (with Cache)
// ==========================================

const monthlySalesStatisticsService = async () => {
  // Cache check
  const cachedData = await getCache("dashboard:monthly-sales");
  if (cachedData) {
    return cachedData;
  }

  const monthlySales = await Order.aggregate([
    {
      $match: { orderStatus: { $ne: "cancelled" } },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
        totalItems: { $sum: { $size: "$orderItems" } },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  // Cache save (15 minutes)
  await setCache("dashboard:monthly-sales", monthlySales, 900);

  return monthlySales;
};

// ==========================================
// Order Statistics (with Cache)
// ==========================================

const orderStatisticsService = async () => {
  // Cache check
  const cachedData = await getCache("dashboard:order-statistics");
  if (cachedData) {
    return cachedData;
  }

  const orderStats = await Order.aggregate([
    {
      $group: {
        _id: "$orderStatus",
        count: { $sum: 1 },
      },
    },
  ]);

  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ orderStatus: "pending" });
  const deliveredOrders = await Order.countDocuments({ orderStatus: "delivered" });
  const cancelledOrders = await Order.countDocuments({ orderStatus: "cancelled" });

  const result = {
    totalOrders,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,
    statusBreakdown: orderStats,
  };

  // Cache save (10 minutes)
  await setCache("dashboard:order-statistics", result, 600);

  return result;
};

// ==========================================
// Revenue Statistics (with Cache)
// ==========================================

const revenueStatisticsService = async () => {
  // Cache check
  const cachedData = await getCache("dashboard:revenue-statistics");
  if (cachedData) {
    return cachedData;
  }

  const revenueStats = await Order.aggregate([
    {
      $match: { orderStatus: { $ne: "cancelled" } },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
        averageOrderValue: { $avg: "$totalPrice" },
        maxOrder: { $max: "$totalPrice" },
        minOrder: { $min: "$totalPrice" },
      },
    },
  ]);

  const result = revenueStats.length > 0
    ? revenueStats[0]
    : {
        totalRevenue: 0,
        averageOrderValue: 0,
        maxOrder: 0,
        minOrder: 0,
      };

  // Cache save (10 minutes)
  await setCache("dashboard:revenue-statistics", result, 600);

  return result;
};

// ==========================================
// Sales Analytics (with Cache)
// ==========================================

const salesAnalyticsService = async (query) => {
  const { period = "month" } = query;

  // Cache check
  const cachedData = await getCache(`dashboard:sales-analytics:${period}`);
  if (cachedData) {
    return cachedData;
  }

  const groupBy = {
    month: { $month: "$createdAt" },
    year: { $year: "$createdAt" },
    week: { $week: "$createdAt" },
    day: { $dayOfMonth: "$createdAt" },
  };

  const salesAnalytics = await Order.aggregate([
    {
      $match: { orderStatus: { $ne: "cancelled" } },
    },
    {
      $group: {
        _id: groupBy[period] || groupBy.month,
        totalOrders: { $sum: 1 },
        totalItems: { $sum: { $size: "$orderItems" } },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Cache save (15 minutes)
  await setCache(`dashboard:sales-analytics:${period}`, salesAnalytics, 900);

  return salesAnalytics;
};

// ==========================================
// Revenue Analytics (with Cache)
// ==========================================

const revenueAnalyticsService = async (query) => {
  const { period = "month" } = query;

  // Cache check
  const cachedData = await getCache(`dashboard:revenue-analytics:${period}`);
  if (cachedData) {
    return cachedData;
  }

  const groupBy = {
    month: { $month: "$createdAt" },
    year: { $year: "$createdAt" },
    week: { $week: "$createdAt" },
    day: { $dayOfMonth: "$createdAt" },
  };

  const revenueAnalytics = await Order.aggregate([
    {
      $match: { orderStatus: { $ne: "cancelled" } },
    },
    {
      $group: {
        _id: groupBy[period] || groupBy.month,
        totalRevenue: { $sum: "$totalPrice" },
        totalOrders: { $sum: 1 },
        averageOrderValue: { $avg: "$totalPrice" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Cache save (15 minutes)
  await setCache(`dashboard:revenue-analytics:${period}`, revenueAnalytics, 900);

  return revenueAnalytics;
};

// ==========================================
// Product Performance Analytics (with Cache)
// ==========================================

const productPerformanceService = async () => {
  // Cache check
  const cachedData = await getCache("dashboard:product-performance");
  if (cachedData) {
    return cachedData;
  }

  const products = await Product.find()
    .populate("category", "name slug")
    .sort({ soldCount: -1 })
    .limit(20)
    .select("name slug price discountPrice soldCount stock rating numReviews");

  // Cache save (10 minutes)
  await setCache("dashboard:product-performance", products, 600);

  return products;
};

// ==========================================
// Customer Analytics (with Cache)
// ==========================================

const customerAnalyticsService = async () => {
  // Cache check
  const cachedData = await getCache("dashboard:customer-analytics");
  if (cachedData) {
    return cachedData;
  }

  const topCustomers = await Order.aggregate([
    {
      $match: { orderStatus: { $ne: "cancelled" } },
    },
    {
      $group: {
        _id: "$user",
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: { totalSpent: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        totalOrders: 1,
        totalSpent: 1,
        "user.name": 1,
        "user.email": 1,
        "user.phone": 1,
      },
    },
  ]);

  const totalCustomers = await User.countDocuments({ role: "customer" });
  const newCustomersThisMonth = await User.countDocuments({
    role: "customer",
    createdAt: {
      $gte: new Date(new Date().setDate(1)),
    },
  });

  const result = {
    totalCustomers,
    newCustomersThisMonth,
    topCustomers,
  };

  // Cache save (10 minutes)
  await setCache("dashboard:customer-analytics", result, 600);

  return result;
};

// ==========================================
// Order Status Analytics (with Cache)
// ==========================================

const orderStatusAnalyticsService = async () => {
  // Cache check
  const cachedData = await getCache("dashboard:order-status-analytics");
  if (cachedData) {
    return cachedData;
  }

  const statusStats = await Order.aggregate([
    {
      $group: {
        _id: "$orderStatus",
        count: { $sum: 1 },
        totalValue: { $sum: "$totalPrice" },
      },
    },
  ]);

  // Cache save (10 minutes)
  await setCache("dashboard:order-status-analytics", statusStats, 600);

  return statusStats;
};

// ==========================================
// User Management (No Cache - Live data needed)
// ==========================================

const userManagementService = async (query) => {
  const { page = 1, limit = 10, search = "" } = query;

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const users = await User.find(filter)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const total = await User.countDocuments(filter);

  return {
    users,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
  };
};

// ==========================================
// Delete User Service
// ==========================================

const deleteUserService = async (userId) => {
  return withTransaction(async (session) => {
    const user = await User.findById(userId).session(session);

    if (!user) {
      throw createError(404, "User not found.");
    }

    if (user.role === "admin") {
      throw createError(400, "Admin user cannot be deleted.");
    }

    await Cart.findOneAndDelete({ user: userId }).session(session);
    await Wishlist.findOneAndDelete({ user: userId }).session(session);
    await Review.deleteMany({ user: userId }).session(session);

    const userOrders = await Order.find({
      user: userId,
      orderStatus: { $nin: ["cancelled", "delivered"] },
    }).session(session);

    for (const order of userOrders) {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(
          item.product,
          {
            $inc: {
              stock: item.quantity,
              soldCount: -item.quantity,
            },
          },
          { session }
        );
      }

      order.orderStatus = "cancelled";
      order.cancelledAt = new Date();
      await order.save({ session });
    }

    await User.findByIdAndDelete(userId).session(session);

    // Cache clear
    await deleteCache("dashboard:overview");
    await deleteCache("dashboard:customer-analytics");

    return {
      message: "User and all related data deleted successfully.",
    };
  });
};

// ==========================================
// Ban User Service
// ==========================================

const banUserService = async (userId) => {
  return withTransaction(async (session) => {
    const user = await User.findById(userId).session(session);

    if (!user) {
      throw createError(404, "User not found.");
    }

    if (user.role === "admin") {
      throw createError(400, "Admin user cannot be banned.");
    }

    if (user.isBanned) {
      throw createError(400, "User is already banned.");
    }

    user.isBanned = true;
    await user.save({ session });

    const userResponse = user.toObject();
    delete userResponse.password;

    return userResponse;
  });
};

// ==========================================
// Unban User Service
// ==========================================

const unbanUserService = async (userId) => {
  return withTransaction(async (session) => {
    const user = await User.findById(userId).session(session);

    if (!user) {
      throw createError(404, "User not found.");
    }

    if (!user.isBanned) {
      throw createError(400, "User is not banned.");
    }

    user.isBanned = false;
    await user.save({ session });

    const userResponse = user.toObject();
    delete userResponse.password;

    return userResponse;
  });
};

module.exports = {
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
};