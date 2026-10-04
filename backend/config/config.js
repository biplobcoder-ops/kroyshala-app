require("dotenv").config();

// ==========================================
// CONFIG FILE
// All environment variables centralized
// ==========================================

const dev = {
  // ---------- APP ----------
  app: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  },

  // ---------- DATABASE ----------
  db: {
    url: process.env.MONGODB_URL,
  },

  // ---------- JWT SECRETS ----------
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    resetPasswordSecret: process.env.JWT_RESET_PASSWORD_SECRET,
    emailVerificationSecret: process.env.EMAIL_VERIFICATION_SECRET,
    accessExpire: process.env.JWT_ACCESS_EXPIRE || "15m",
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || "7d",
  },

  // ---------- EMAIL (SMTP) ----------
  email: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_USER,
  },

  // ---------- CLOUDINARY ----------
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // ---------- REDIS (Upstash) ----------
  redis: {
    url: process.env.REDIS_URL,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
  },

  // ---------- GOOGLE OAUTH ----------
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },

  // ---------- DEFAULT USER IMAGE ----------
  defaultUserImage: {
    publicId: process.env.DEFAULT_USER_IMAGE_PUBLIC_ID,
    url: process.env.DEFAULT_USER_IMAGE_URL,
  },
};

module.exports = dev;
