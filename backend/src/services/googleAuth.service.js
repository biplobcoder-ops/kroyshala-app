const { OAuth2Client } = require("google-auth-library");
const User = require("../models/users.model");
const createError = require("http-errors");
const createJsonWebToken = require("../utils/createJsonWebToken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ==========================================
// Google Auth Service
// ==========================================

const googleAuthService = async (idToken) => {
  // 1. Verify Google ID token
  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  } catch (error) {
    throw createError(401, "Invalid Google token.");
  }

  const payload = ticket.getPayload();
  const { sub: googleId, email, name, picture } = payload;

  if (!email) {
    throw createError(400, "Google account email not found.");
  }

  // 2. Find user by googleId or email
  let user = await User.findOne({ $or: [{ googleId }, { email }] });
  let isNewUser = false;

  if (!user) {
    // 3. New user create
    isNewUser = true;

    user = await User.create({
      name: name || "Google User",
      email,
      googleId,
      password: "google-oauth-" + Date.now(),
      phone: "",
      address: {
        street: "",
        city: "",
        postalCode: "",
        country: "Bangladesh",
      },
      image: {
        public_id: "",
        url: picture || "",
      },
      role: "customer",
      isBanned: false,
    });
  } else if (!user.googleId) {
    // 4. Link googleId to existing account
    user.googleId = googleId;
    await user.save();
  }

  // 5. Banned check
  if (user.isBanned) {
    throw createError(403, "Your account has been banned.");
  }

  // 6. Generate tokens
  const accessToken = createJsonWebToken(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    "1h"
  );

  const refreshToken = createJsonWebToken(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    "7d"
  );

  // 7. Remove password
  const userData = user.toObject();
  delete userData.password;

  return {
    user: userData,
    accessToken,
    refreshToken,
    isNewUser,
  };
};

module.exports = { googleAuthService };