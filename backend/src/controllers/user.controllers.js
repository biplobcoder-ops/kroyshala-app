const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { jwtEmailVerificationKey } = require("../constants/secret");
const successResponse = require("../utils/successResponse");
const { sendVerificationEmail } = require("../config/mail");
const createJsonWebToken = require("../utils/createJsonWebToken");
const { 
getCurrentUserService, 
updateProfileService,
changePasswordService,
forgotPasswordService,
resetPasswordService, 
} = require("../services/user.service");

const { registerUserService } = require("../services/auth.service"); // ✅ Import

// Register Controller
const handleRegisterUser = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body);

    return successResponse(res, {
      statusCode: 200,
      message: "Verification email sent! Please check your inbox.",
      payload: {
        email: result.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 02. Verify Email API
// ==========================================
const handleVerifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    // Check if token is provided
    if (!token) {
      throw createError(400, "Verification token is required.");
    }

    // Verify JWT token and get all data
    let decoded;
    try {
      decoded = jwt.verify(token, jwtEmailVerificationKey);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(400, "Verification link has expired. Please register again.");
      }
      throw createError(400, "Invalid verification link. Please register again.");
    }

    // Destructure all data from token
    const { name, email, password, phone, address } = decoded;

    // Check if user already verified
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(409, "Your email is already verified. Please login.");
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address: address || {},
      isBanned: false,
    });

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return successResponse(res, {
      statusCode: 201,
      message: "Email verified successfully! Your account is now active.",
      payload: {
        user: userResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCurrentUser = async (req, res, next) => {
  try {
    // req.user থেকে ID পাবো (middleware থেকে আসে)
    const userId = req.user.id;

    // Service call করো
    const result = await getCurrentUserService(userId);

    // Success response
    return successResponse(res, {
      statusCode: 200,
      message: "User profile fetched successfully.",
      payload: {
        user: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;
    const file = req.file; // Multer থেকে আসা file (buffer)

    // Service call
    const result = await updateProfileService(userId, updateData, file);

    // Success response
    return successResponse(res, {
      statusCode: 200,
      message: "Profile updated successfully.",
      payload: {
        user: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleChangePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Service call with all 3 fields
    const result = await changePasswordService(
      userId,
      oldPassword,
      newPassword,
      confirmPassword
    );

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const handleForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await forgotPasswordService(email);

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const handleResetPassword = async (req, res, next) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    const result = await resetPasswordService(
      token,
      newPassword,
      confirmPassword
    );

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  handleRegisterUser,
  handleVerifyEmail,
  handleGetCurrentUser,
  handleUpdateProfile,
  handleChangePassword,
  handleForgotPassword, // 🆕
  handleResetPassword, // 🆕
};