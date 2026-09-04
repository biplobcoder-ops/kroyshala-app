const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },

        name: {
          type: String,
          required: [true, "Product name is required"],
        },

        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },

        price: {
          type: Number,
          required: [true, "Price is required"],
        },

        image: {
          type: String,
          default: "",
        },
      },
    ],

    shippingAddress: {
      street: {
        type: String,
        required: [true, "Street is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      postalCode: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "Bangladesh",
      },
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "bkash", "card"],
      default: "cod",
    },

    itemsPrice: {
      type: Number,
      required: [true, "Items price is required"],
      default: 0,
    },

    shippingPrice: {
      type: Number,
      default: 60,
    },

    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      default: 0,
    },

    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },

    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;