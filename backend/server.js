const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");

const PORT = config.app.port || 4000;

// Connect database
connectDB()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((error) => console.error("❌ Database failed:", error.message));

// Local: start server with listen
// Vercel: skip listen, export app
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
} else {
  console.log(`🚀 Server ready for Vercel serverless`);
}

// ⚠️ CRITICAL: Export for Vercel
module.exports = app;
