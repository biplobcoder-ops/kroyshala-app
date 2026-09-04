const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const User = require("../models/users.model");
const createError = require("http-errors");
const withTransaction = require("../utils/transaction");
const {
  sendOrderCreatedEmail,
  sendOrderConfirmedEmail,
  sendOrderDeliveredEmail,
} = require("../utils/sendEmail");

// ==========================================
// Create Order Service (Transaction)
// ==========================================

const createOrderService = async (userId, shippingAddress, paymentMethod) => {
  return withTransaction(async (session) => {
    // 1. Cart find
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw createError(400, "Cart is empty. Add products first.");
    }

    // 2. Order items prepare + Stock check
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        throw createError(404, "Product not found in cart.");
      }

      if (product.stock < item.quantity) {
        throw createError(
          400,
          `Not enough stock for ${product.name}. Available: ${product.stock}`
        );
      }

      await Product.findByIdAndUpdate(
        product._id,
        {
          $inc: {
            stock: -item.quantity,
            soldCount: item.quantity,
          },
        },
        { session, new: true }
      );

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        image: product.images.length > 0 ? product.images[0].url : "",
      });
    }

    // 3. Price calculate
    const itemsPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const shippingPrice = itemsPrice > 5000 ? 0 : 60;
    const totalPrice = itemsPrice + shippingPrice;

    // 4. Order create
    const order = await Order.create(
      [
        {
          user: userId,
          orderItems,
          shippingAddress,
          paymentMethod: paymentMethod || "cod",
          itemsPrice,
          shippingPrice,
          totalPrice,
          orderStatus: "pending",
        },
      ],
      { session }
    );

    // 5. Cart clear
    await Cart.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          items: [],
          totalPrice: 0,
          totalItems: 0,
        },
      },
      { session }
    );

    // 6. User find (manual fetch)
    const userData = await User.findById(userId).select("name email phone");

    if (!userData) {
      console.error("❌ User not found for order:", order[0]._id);
      throw createError(404, "User not found.");
    }

    // 7. Order-এ user attach (manual)
    const populatedOrder = order[0];
    populatedOrder.user = userData;

    // 8. Email send (safe - null check সহ)
    if (userData.email) {
      try {
        await sendOrderCreatedEmail(
          userData.email,
          userData.name,
          populatedOrder
        );
      } catch (emailError) {
        console.error("Email send failed:", emailError.message);
        // Email fail হলে order create হওয়া বন্ধ হবে না
      }
    }

    return populatedOrder;
  });
};

// ==========================================
// Get My Orders Service
// ==========================================

const getMyOrdersService = async (userId) => {
  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("user", "name email");

  return orders;
};

// ==========================================
// Get Single Order Service
// ==========================================

const getSingleOrderService = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, user: userId }).populate(
    "user",
    "name email phone"
  );

  if (!order) {
    throw createError(404, "Order not found.");
  }

  return order;
};

// ==========================================
// Cancel Order Service (Transaction)
// ==========================================

const cancelOrderService = async (userId, orderId) => {
  return withTransaction(async (session) => {
    // 1. Order find
    const order = await Order.findOne({ _id: orderId, user: userId }).session(
      session
    );

    if (!order) {
      throw createError(404, "Order not found.");
    }

    // 2. Already cancelled check
    if (order.orderStatus === "cancelled") {
      throw createError(400, "Order is already cancelled.");
    }

    // 3. Only pending/confirmed can cancel
    if (order.orderStatus !== "pending" && order.orderStatus !== "confirmed") {
      throw createError(400, "Order cannot be cancelled at this stage.");
    }

    // 4. Stock restore
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

    // 5. Order update
    order.orderStatus = "cancelled";
    order.cancelledAt = new Date();
    await order.save({ session });

    // 6. User find (manual)
    const userData = await User.findById(userId).select("name email");

    const populatedOrder = order.toObject();
    populatedOrder.user = userData;

    return populatedOrder;
  });
};

// ==========================================
// Get All Orders Service (Admin)
// ==========================================

const getAllOrdersService = async (query) => {
  const { page = 1, limit = 10, orderStatus = "" } = query;

  const filter = {};
  if (orderStatus) {
    filter.orderStatus = orderStatus;
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const orders = await Order.find(filter)
    .populate("user", "name email phone")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const total = await Order.countDocuments(filter);

  return {
    orders,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
  };
};

// ==========================================
// Update Order Status Service (Transaction)
// ==========================================

const updateOrderStatusService = async (orderId, orderStatus) => {
  return withTransaction(async (session) => {
    // 1. Valid status check
    const validStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      throw createError(400, "Invalid order status.");
    }

    // 2. Order find
    const order = await Order.findById(orderId).session(session);

    if (!order) {
      throw createError(404, "Order not found.");
    }

    // 3. Cancelled হলে stock restore
    if (orderStatus === "cancelled" && order.orderStatus !== "cancelled") {
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

      order.cancelledAt = new Date();
    }

    // 4. Delivered হলে
    if (orderStatus === "delivered") {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    // 5. Status update
    order.orderStatus = orderStatus;
    await order.save({ session });

    // 6. User find (manual)
    const userData = await User.findById(order.user).select("name email");

    const populatedOrder = order.toObject();
    populatedOrder.user = userData;

    // 7. Email send (delivered হলে)
    if (orderStatus === "delivered" && userData && userData.email) {
      try {
        await sendOrderDeliveredEmail(
          userData.email,
          userData.name,
          populatedOrder
        );
      } catch (emailError) {
        console.error("Email send failed:", emailError.message);
      }
    }

    return populatedOrder;
  });
};

// ==========================================
// Confirm Order Service (Transaction)
// ==========================================

const confirmOrderService = async (userId, orderId) => {
  return withTransaction(async (session) => {
    // 1. Order find
    const order = await Order.findOne({ _id: orderId, user: userId }).session(
      session
    );

    if (!order) {
      throw createError(404, "Order not found.");
    }

    // 2. Only pending can confirm
    if (order.orderStatus !== "pending") {
      throw createError(400, "Only pending orders can be confirmed.");
    }

    // 3. Confirm
    order.orderStatus = "confirmed";
    await order.save({ session });

    // 4. User find (manual)
    const userData = await User.findById(userId).select("name email");

    const populatedOrder = order.toObject();
    populatedOrder.user = userData;

    // 5. Email send
    if (userData && userData.email) {
      try {
        await sendOrderConfirmedEmail(
          userData.email,
          userData.name,
          populatedOrder
        );
      } catch (emailError) {
        console.error("Email send failed:", emailError.message);
      }
    }

    return populatedOrder;
  });
};

const bulkUpdateOrderStatusService = async (orderIds, orderStatus) => {
  const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
  
  if (!validStatuses.includes(orderStatus)) {
    throw createError(400, "Invalid order status.");
  }

  const result = await Order.updateMany(
    { _id: { $in: orderIds } },
    { $set: { orderStatus } }
  );

  return {
    updatedCount: result.modifiedCount,
  };
};

module.exports = {
  createOrderService,
  getMyOrdersService,
  getSingleOrderService,
  cancelOrderService,
  getAllOrdersService,
  updateOrderStatusService,
  confirmOrderService,
  bulkUpdateOrderStatusService,
};