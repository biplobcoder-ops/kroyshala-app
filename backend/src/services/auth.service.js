const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const createJsonWebToken = require("../utils/createJsonWebToken");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/sendEmail"); // ✅ Email import
const { jwtEmailVerificationKey } = require("../constants/secret");

// ==========================================
// Register User Service
// ==========================================
const registerUserService = async (userData) => {
  const { name, email, password, phone, address } = userData;

  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError(409, "This email is already registered. Please login.");
  }

  // 2. Payload for JWT
  const payload = {
    name,
    email,
    password,
    phone,
    address,
  };

  // 3. Create JWT verification token
  const verificationToken = createJsonWebToken(
    payload,
    jwtEmailVerificationKey,
    "15m"
  );

  // 4. Send verification email
  await sendVerificationEmail(email, verificationToken);

  return {
    email: email,
  };
};

// ==========================================
// Login Service
// ==========================================
const loginUserService = async (email, password) => {
  // 1. Find user by email
  const user = await User.findOne({ email });

  // 2. User না থাকলে error
  if (!user) {
    throw createError(401, "Invalid email or password.");
  }

  // 3. Check if user is banned
  if (user.isBanned) {
    throw createError(403, "Your account is blocked. Contact admin.");
  }

  // 4. Check password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw createError(401, "Invalid email or password.");
  }

  // 5. Create JWT access token (1 hour)
  const accessToken = createJsonWebToken(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    "1h"
  );

  // 6. Create JWT refresh token (7 days)
  const refreshToken = createJsonWebToken(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    "7d"
  );

  // 7. Remove password from user data
  const userData = user.toObject();
  delete userData.password;

  return {
    user: userData,
    accessToken,
    refreshToken,
  };
};

// ==========================================
// Logout Service
// ==========================================
const logoutUserService = async () => {
  return { message: "Logged out successfully" };
};

// ==========================================
// Refresh Token Service
// ==========================================
const refreshTokenService = async (refreshToken) => {
  // 1. Check if refresh token exists
  if (!refreshToken) {
    throw createError(401, "Refresh token not found. Please login again.");
  }

  // 2. Verify refresh token
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw createError(401, "Refresh token expired. Please login again.");
  }

  // 3. Find user
  const user = await User.findById(decoded.id);

  if (!user) {
    throw createError(404, "User not found.");
  }

  if (user.isBanned) {
    throw createError(403, "Your account is blocked.");
  }

  // 4. Create new access token (1 hour)
  const newAccessToken = createJsonWebToken(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    "1h"
  );

  return {
    accessToken: newAccessToken,
  };
};

module.exports = {
  registerUserService, // ✅ Add
  loginUserService,
  logoutUserService,
  refreshTokenService,
};