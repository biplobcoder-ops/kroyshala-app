const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const createError = require("http-errors");
const withTransaction = require("../utils/transaction");

// ==========================================
// Get Cart Service (Null Safe)
// ==========================================
const getCartService = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "items.product",
    "name slug price discountPrice images stock isActive"
  );

  if (!cart) {
    return {
      user: userId,
      items: [],
      totalPrice: 0,
      totalItems: 0,
    };
  }

  // ==========================================
  // Remove Invalid Items (product deleted বা null)
  // ==========================================

  let hasInvalidItems = false;

  const validItems = cart.items.filter((item) => {
    // Product null হলে remove
    if (!item.product) {
      hasInvalidItems = true;
      return false;
    }

    // Product inactive হলে remove
    if (item.product.isActive === false) {
      hasInvalidItems = true;
      return false;
    }

    return true;
  });

  // Invalid items থাকলে cart update
  if (hasInvalidItems) {
    cart.items = validItems;
    await calculateCartTotals(cart);
    await cart.save();
    await cart.populate(
      "items.product",
      "name slug price discountPrice images stock isActive"
    );
  }

  return cart;
};

// ==========================================
// Add To Cart Service (Transaction)
// ==========================================
const addToCartService = async (userId, productId, quantity = 1) => {
  return withTransaction(async (session) => {
    // 1. Product check
    const product = await Product.findById(productId).session(session);

    if (!product) {
      throw createError(404, "Product not found.");
    }

    if (!product.isActive) {
      throw createError(400, "Product is not available.");
    }

    // 2. Cart find or create
    let cart = await Cart.findOne({ user: userId }).session(session);

    if (!cart) {
      cart = await Cart.create(
        [
          {
            user: userId,
            items: [],
            totalPrice: 0,
            totalItems: 0,
          },
        ],
        { session }
      );
      cart = cart[0];
    }

    // 3. Remove invalid items first
    const validItems = [];
    let hasInvalidItems = false;

    for (const item of cart.items) {
      const existingProduct = await Product.findById(item.product).session(
        session
      );

      if (existingProduct && existingProduct.isActive) {
        validItems.push(item);
      } else {
        hasInvalidItems = true;
      }
    }

    if (hasInvalidItems) {
      cart.items = validItems;
    }

    // 4. Existing item check
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    let newQuantity = Number(quantity);

    if (existingItem) {
      newQuantity = existingItem.quantity + Number(quantity);
    }

    // 5. Stock check
    if (newQuantity > product.stock) {
      throw createError(
        400,
        `Not enough stock. Available: ${product.stock}`
      );
    }

    // 6. Update cart
    if (existingItem) {
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: productId,
        quantity: newQuantity,
      });
    }

    // 7. Calculate totals
    await calculateCartTotals(cart, session);

    // 8. Save
    await cart.save({ session });

    // 9. Populate
    await cart.populate(
      "items.product",
      "name slug price discountPrice images stock isActive"
    );

    return cart;
  });
};

// ==========================================
// Update Cart Quantity Service (Transaction)
// ==========================================
const updateCartQuantityService = async (userId, productId, quantity) => {
  return withTransaction(async (session) => {
    // 1. Cart find
    const cart = await Cart.findOne({ user: userId }).session(session);

    if (!cart) {
      throw createError(404, "Cart not found.");
    }

    // 2. Product check
    const product = await Product.findById(productId).session(session);

    if (!product) {
      throw createError(404, "Product not found.");
    }

    if (!product.isActive) {
      throw createError(400, "Product is not available.");
    }

    // 3. Item find
    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      throw createError(404, "Product not found in cart.");
    }

    // 4. Quantity update or remove
    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      // Stock check
      if (quantity > product.stock) {
        throw createError(
          400,
          `Not enough stock. Available: ${product.stock}`
        );
      }
      item.quantity = Number(quantity);
    }

    // 5. Calculate totals
    await calculateCartTotals(cart, session);

    // 6. Save
    await cart.save({ session });

    // 7. Populate
    await cart.populate(
      "items.product",
      "name slug price discountPrice images stock isActive"
    );

    return cart;
  });
};

// ==========================================
// Remove From Cart Service (Transaction)
// ==========================================
const removeFromCartService = async (userId, productId) => {
  return withTransaction(async (session) => {
    // 1. Cart find
    const cart = await Cart.findOne({ user: userId }).session(session);

    if (!cart) {
      throw createError(404, "Cart not found.");
    }

    // 2. Remove item
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // 3. Calculate totals
    await calculateCartTotals(cart, session);

    // 4. Save
    await cart.save({ session });

    // 5. Populate
    await cart.populate(
      "items.product",
      "name slug price discountPrice images stock isActive"
    );

    return cart;
  });
};

// ==========================================
// Calculate Cart Totals Helper (Null Safe)
// ==========================================
const calculateCartTotals = async (cart, session) => {
  let totalPrice = 0;
  let totalItems = 0;

  const validItems = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.product).session(session);

    if (product && product.isActive) {
      const price =
        product.discountPrice > 0 ? product.discountPrice : product.price;
      totalPrice += price * item.quantity;
      totalItems += item.quantity;
      validItems.push(item);
    }
    // product null বা inactive হলে item remove হবে
  }

  // Invalid items remove
  cart.items = validItems;
  cart.totalPrice = totalPrice;
  cart.totalItems = totalItems;
};

// ==========================================
// Clear Cart Service (Optional)
// ==========================================
const clearCartService = async (userId) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    {
      $set: {
        items: [],
        totalPrice: 0,
        totalItems: 0,
      },
    },
    { new: true }
  );

  return cart;
};

module.exports = {
  getCartService,
  addToCartService,
  updateCartQuantityService,
  removeFromCartService,
  clearCartService,
};