const {
  loginUserService,
  logoutUserService,
  refreshTokenService,
} = require("../services/auth.service");

const { googleAuthService } = require("../services/googleAuth.service");
const successResponse = require("../utils/successResponse");
const createError = require("http-errors");

// ==========================================
// Login Controller
// ==========================================

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService(email, password);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Login successful! Welcome back.",
      payload: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Logout Controller
// ==========================================

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Logged out successfully. See you again!",
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Refresh Token Controller
// ==========================================

const handleRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw createError(401, "Refresh token not found. Please login again.");
    }

    const result = await refreshTokenService(refreshToken);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "New access token generated successfully.",
      payload: { accessToken: result.accessToken },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Google Auth Controller
// ==========================================

const handleGoogleAuth = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      throw createError(400, "Google ID token is required.");
    }

    const result = await googleAuthService(idToken);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, {
      statusCode: 200,
      message: result.isNewUser ? "Account created successfully." : "Login successful.",
      payload: {
        user: result.user,
        accessToken: result.accessToken,
        isNewUser: result.isNewUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleGoogleAuth,
};