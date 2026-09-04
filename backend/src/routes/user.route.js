const express = require("express");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/upload");

// ✅ Validation schemas
const {
  registerUserSchema,
  verifyEmailSchema,
  updateProfileSchema,
  changePasswordSchema,
  resetPasswordSchema,
  forgotPasswordSchema,
} = require("../validators/usersValidation");

// ✅ Controllers - সব এখানে import করো
const {
  handleRegisterUser,
  handleVerifyEmail,
  handleGetCurrentUser,
  handleUpdateProfile,
  handleChangePassword, // ✅ এটা add করা ছিল না
  handleForgotPassword, // 🆕
  handleResetPassword, // 🆕
} = require("../controllers/user.controllers");

const { isLoggedIn } = require("../middlewares/auth");

const userRouter = express.Router();

// Register
userRouter.post("/register", validate(registerUserSchema), handleRegisterUser);

// Verify Email
userRouter.post("/verify-email", validate(verifyEmailSchema), handleVerifyEmail);

// Get Current User
userRouter.get("/me", isLoggedIn, handleGetCurrentUser);

// Update Profile
userRouter.put(
  "/profile",
  isLoggedIn,
  upload.single("image"),
  validate(updateProfileSchema),
  handleUpdateProfile
);

// ✅ Change Password
userRouter.put(
  "/change-password",
  isLoggedIn,
  validate(changePasswordSchema),
  handleChangePassword // ✅ এখন ঠিকমতো controller থেকে আসবে
);
userRouter.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  handleForgotPassword
);

// 🆕 Reset Password
userRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  handleResetPassword
)

module.exports = userRouter;