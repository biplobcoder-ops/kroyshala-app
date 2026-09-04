const Order = require("../models/order.model");
const {
  createOrderService,
  getMyOrdersService,
  getSingleOrderService,
  cancelOrderService,
  getAllOrdersService,
  updateOrderStatusService,
  confirmOrderService,
} = require("../services/order.service");
const createError = require("http-errors");
const successResponse = require("../utils/successResponse");

// ==========================================
// Create Order Controller
// ==========================================
const handleCreateOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod } = req.body;
    const result = await createOrderService(userId, shippingAddress, paymentMethod);
    return successResponse(res, {
      statusCode: 201,
      message: "Order created successfully.",
      payload: { order: result },
    });
  } catch (error) { next(error); }
};

// ==========================================
// Get My Orders Controller
// ==========================================
const handleGetMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await getMyOrdersService(userId);
    return successResponse(res, {
      statusCode: 200,
      message: "Orders fetched successfully.",
      payload: { orders: result, count: result.length },
    });
  } catch (error) { next(error); }
};

// ==========================================
// Get Single Order Controller (User)
// ==========================================
const handleGetSingleOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const result = await getSingleOrderService(userId, id);
    return successResponse(res, {
      statusCode: 200,
      message: "Order fetched successfully.",
      payload: { order: result },
    });
  } catch (error) { next(error); }
};

// ==========================================
// Cancel Order Controller
// ==========================================
const handleCancelOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const result = await cancelOrderService(userId, id);
    return successResponse(res, {
      statusCode: 200,
      message: "Order cancelled successfully.",
      payload: { order: result },
    });
  } catch (error) { next(error); }
};

// ==========================================
// Get All Orders Controller (Admin)
// ==========================================
const handleGetAllOrders = async (req, res, next) => {
  try {
    const result = await getAllOrdersService(req.query);
    return successResponse(res, {
      statusCode: 200,
      message: "All orders fetched successfully.",
      payload: result,
    });
  } catch (error) { next(error); }
};

// ==========================================
// Update Order Status Controller (Admin)
// ==========================================
const handleUpdateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const result = await updateOrderStatusService(id, orderStatus);
    return successResponse(res, {
      statusCode: 200,
      message: "Order status updated successfully.",
      payload: { order: result },
    });
  } catch (error) { next(error); }
};

// ==========================================
// Confirm Order Controller
// ==========================================
const handleConfirmOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const result = await confirmOrderService(userId, id);
    return successResponse(res, {
      statusCode: 200,
      message: "Order confirmed successfully.",
      payload: { order: result },
    });
  } catch (error) { next(error); }
};

// ==========================================
// Get Single Order Admin Controller
// ==========================================
const handleGetSingleOrderAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email phone");
    if (!order) throw createError(404, "Order not found.");
    return successResponse(res, {
      statusCode: 200,
      message: "Order fetched successfully.",
      payload: { order },
    });
  } catch (error) { next(error); }
};

module.exports = {
  handleCreateOrder,
  handleGetMyOrders,
  handleGetSingleOrder,
  handleCancelOrder,
  handleGetAllOrders,
  handleUpdateOrderStatus,
  handleConfirmOrder,
  handleGetSingleOrderAdmin,
};