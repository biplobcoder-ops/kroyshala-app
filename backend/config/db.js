const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.url);

    console.log("✅ MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("Stack:", error.stack);

    // ⚠️ Vercel serverless e process.exit(1) e CRASH koray
    // Tai sudhu throw koro — error handler catch korbe
    throw error;
  }
};

module.exports = connectDB;
