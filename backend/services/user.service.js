const User = require("../models/users.model");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // 🆕
const createJsonWebToken = require("../utils/createJsonWebToken"); // 🆕
const { sendPasswordResetEmail } = require("../utils/sendEmail") // 🆕
const { jwtResetPasswordKey } = require("../constants/secret"); // 🆕


const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");
const { default_image_public_id } = require("../constants/secret");

// ==========================================
// Get Current User Service
// ==========================================
const getCurrentUserService = async (userId) => {
  // 1. Database থেকে user খুঁজো
  const user = await User.findById(userId).select("-password");

  // 2. User না থাকলে error
  if (!user) {
    throw createError(404, "User not found.");
  }

  // 3. User banned থাকলে error
  if (user.isBanned) {
    throw createError(403, "Your account is blocked. Contact admin.");
  }

  // 4. User data return করো
  return user;
};

const updateProfileService = async (userId, updateData, file) => {
  // 1. User খুঁজে বের করো
  const user = await User.findById(userId);

  if (!user) {
    throw createError(404, "User not found.");
  }

  // 2. Check if user is banned
  if (user.isBanned) {
    throw createError(403, "Your account is blocked. Contact admin.");
  }

  // 3. Basic info update
  if (updateData.name) user.name = updateData.name;
  if (updateData.phone) user.phone = updateData.phone;
  if (updateData.address) {
    user.address = {
      ...user.address,
      ...updateData.address,
    };
  }

  // 4. Image upload (যদি নতুন ছবি থাকে)
  if (file) {
    // পুরানো image delete করো (default image ছাড়া)
    if (user.image.public_id !== default_image_public_id) {
      await deleteFromCloudinary(user.image.public_id);
    }

    // নতুন image upload করো buffer থেকে
    const result = await uploadToCloudinary(file.buffer, "kroyshala/users");

    user.image = {
      public_id: result.public_id,
      url: result.url,
    };
  }

  // 5. Save user
  await user.save();

  // 6. Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  return userResponse;
};

const changePasswordService = async (userId, oldPassword, newPassword, confirmPassword) => {
  // 1. Confirm password check
  if (newPassword !== confirmPassword) {
    throw createError(400, "New password and confirm password do not match");
  }

  // 2. User খুঁজো
  const user = await User.findById(userId);
  if (!user) {
    throw createError(404, "User not found.");
  }

  // 3. Banned check
  if (user.isBanned) {
    throw createError(403, "Your account is blocked.");
  }

  // 4. Old password check
  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw createError(400, "Current password is incorrect.");
  }

  // 5. New password আলাদা কিনা
  if (oldPassword === newPassword) {
    throw createError(400, "New password must be different from current password.");
  }

  // 6. Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // 7. Update password
  user.password = hashedPassword;
  await user.save();

  return { message: "Password changed successfully" };
};

const forgotPasswordService = async (email) => {
  // 1. User খুঁজো
  const user = await User.findOne({ email });

  // 2. User না থাকলেও success message দিবো (security - email guessing বন্ধ করতে)
  if (!user) {
    return { 
      message: "If this email exists, we sent a password reset link." 
    };
  }

  // 3. Banned check
  if (user.isBanned) {
    throw createError(403, "Your account is blocked.");
  }

  // 4. JWT reset token তৈরি করো (15 min valid)
  const resetToken = createJsonWebToken(
    { 
      id: user._id,
      email: user.email 
    },
    jwtResetPasswordKey,
    "15m"
  );

  // 5. Email পাঠাও
  await sendPasswordResetEmail(email, resetToken);

  return { 
    message: "Password reset link sent to your email." 
  };
};

// ==========================================
// Reset Password Service
// ==========================================
const resetPasswordService = async (token, newPassword, confirmPassword) => {
  // 1. Password match check
  if (newPassword !== confirmPassword) {
    throw createError(400, "Passwords do not match.");
  }

  // 2. Token verify করো
  let decoded;
  try {
    decoded = jwt.verify(token, jwtResetPasswordKey);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createError(400, "Reset link has expired. Please try again.");
    }
    throw createError(400, "Invalid reset token.");
  }

  // 3. User খুঁজো
  const user = await User.findById(decoded.id);

  if (!user) {
    throw createError(404, "User not found.");
  }

  // 4. Banned check
  if (user.isBanned) {
    throw createError(403, "Your account is blocked.");
  }

  // 5. New password hash করো
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // 6. Password update করো
  user.password = hashedPassword;
  await user.save();

  return { 
    message: "Password reset successfully. Please login with new password." 
  };
};


module.exports = {
  getCurrentUserService,
  updateProfileService,
  changePasswordService, 
  forgotPasswordService,
  resetPasswordService,
};