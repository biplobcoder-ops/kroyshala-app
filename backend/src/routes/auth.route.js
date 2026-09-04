const express = require("express");
const validate = require("../middlewares/validate");
const { loginSchema } = require("../validators/auth.validation");
const {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleGoogleAuth,
} = require("../controllers/auth.controllers");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");

const authRouter = express.Router();

// Google OAuth (public)
authRouter.post("/google", handleGoogleAuth);

// Login - Only logged out users
authRouter.post("/login", isLoggedOut, validate(loginSchema), handleLogin);

// Logout - Public (no isLoggedIn) so cookies always clear
authRouter.post("/logout", handleLogout);

// Refresh token
authRouter.post("/refresh-token", handleRefreshToken);

module.exports = authRouter;