const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// ==========================================
// Token Extract Helper (Header + Cookie)
// ==========================================

const extractToken = (req) => {
  // 1. Authorization header থেকে token
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  // 2. Cookie থেকে token (fallback)
  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }

  return null;
};

// ==========================================
// Secret Key Helper
// ==========================================

const getAccessTokenSecret = () => {
  return (
    process.env.ACCESS_TOKEN_SECRET ||
    process.env.JWT_ACCESS_SECRET ||
    "access_secret_key"
  );
};

// ==========================================
// Is Logged In Middleware
// ==========================================

const isLoggedIn = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      throw createError(401, "Access token not found. Please login.");
    }

    // Token verify
    const decoded = jwt.verify(token, getAccessTokenSecret());

    // User info attach
    req.user = {
      id: decoded.id || decoded._id || decoded.userId,
      role: decoded.role || "customer",
    };

    next();
  } catch (error) {
    next(createError(401, "Invalid or expired token. Please login again."));
  }
};

// ==========================================
// Is Admin Middleware
// ==========================================

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    next(createError(403, "Access denied. Admin only."));
  }
};

// ==========================================
// Is Logged Out Middleware
// ==========================================

const isLoggedOut = (req, res, next) => {
  const token = extractToken(req);

  if (token) {
    try {
      jwt.verify(token, getAccessTokenSecret());
      return next(createError(400, "Already logged in."));
    } catch (error) {
      // Token invalid - allow login
      return next();
    }
  }

  next();
};

module.exports = {
  isLoggedIn,
  isAdmin,
  isLoggedOut,
};