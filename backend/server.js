const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");

const PORT = config.app.port || 4000;

// ==========================================
// CONNECT DATABASE
// ==========================================
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });

// ==========================================
// START SERVER
// ==========================================
// ⚠️ Important for Vercel:
// Vercel uses serverless functions, `app.listen()` 
// will be ignored on Vercel but works locally.
// Vercel imports `app` directly via module.exports.
// ==========================================

if (process.env.NODE_ENV !== "production") {
  // Local development: start server with listen
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
} else {
  // Production (Vercel): just log, don't listen
  console.log(`🚀 Server ready for Vercel serverless`);
}

// ==========================================
// EXPORT APP FOR VERCEL
// ==========================================
// ⚠️ CRITICAL: Vercel needs this export!
module.exports = app;
