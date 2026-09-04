const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters"],
      maxlength: [200, "Product name must not exceed 200 characters"],
    },

    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [2000, "Description must not exceed 2000 characters"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
      default: 0,
    },

    brand: {
      type: String,
      trim: true,
      default: "",
    },

    sku: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "SKU is required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    // ✅ Images array - required
    images: [
      {
        public_id: {
          type: String,
          required: [true, "Image public_id is required"],
        },
        url: {
          type: String,
          required: [true, "Image URL is required"],
        },
      },
    ],

    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    specifications: {
      color: {
        type: String,
        default: "",
      },
      size: {
        type: String,
        default: "",
      },
      weight: {
        type: String,
        default: "",
      },
      material: {
        type: String,
        default: "",
      },
    },

    rating: {
      type: Number,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    soldCount: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: 1, slug: 1, tags: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;