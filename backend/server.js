const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");

const PORT = config.app.port || 4000;

// ==========================================
// Connect Database (with proper error handling)
// ==========================================
connectDB()
  .then(() => console.log("✅ Server ready — DB connected"))
  .catch((error) => console.error("❌ Initial DB connection failed:", error.message));

// ==========================================
// Start Server
// ==========================================
if (process.env.NODE_ENV !== "production") {
  // Local development
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
} else {
  // Vercel serverless
  console.log("🚀 Server ready for Vercel serverless");
}

module.exports = app;
