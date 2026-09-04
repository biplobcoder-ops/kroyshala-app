const mongoose = require("mongoose");
const { default_image_public_id, default_image_url } = require("../constants/secret");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name must not exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
     googleId: {
      type: String,
      unique: true,
      sparse: true, // যাতে null/undefined একাধিক user-এ থাকতে পারে
    },

    phone: {
      type: String,
      default:"",
      trim: true,
    },

    address: {
      street: {
        type: String,
        trim: true,
        default: "",
      },
      city: {
        type: String,
        trim: true,
        default: "",
      },
      postalCode: {
        type: String,
        trim: true,
        default: "",
      },
      country: {
        type: String,
        trim: true,
        default: "Bangladesh",
      },
    },

    image: {
      public_id: {
        type: String,
        default: default_image_public_id,
      },
      url: {
        type: String,
        default: default_image_url,
      },
    },

    role: {
      type: String,
      enum: ["customer", "admin", "manager"],
      default: "customer",
    },

    // ✅ status field remove করেছি
    // ✅ শুধু isBanned রাখছি - admin ব্লক করার জন্য
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;