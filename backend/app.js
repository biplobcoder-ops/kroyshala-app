const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const errorResponse = require("./utils/errorResponse");
const userRouter = require("./routes/user.route");
const seedRouter = require("./routes/seedRoute");
const authRouter = require("./routes/auth.route");
const categoryRouter = require("./routes/category.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const reviewRouter = require("./routes/review.route");
const orderRouter = require("./routes/order.route");
const wishlistRouter = require("./routes/wishlist.route");
const dashboardRouter = require("./routes/dashboard.route");
const searchRouter = require("./routes/search.route");

// ==========================================
// CORS - Allowed Origins
// ==========================================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://kroyshala-app.vercel.app",
  "https://kroyshala-frontend.vercel.app",          // ✅ Main
  "https://kroyshala-frontend-mxvqhn2qq-biplob-coder-team.vercel.app", // ✅ Deployment
  process.env.CLIENT_URL,                            // ✅ Env var
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // No origin (Postman, mobile) — allow
      if (!origin) return callback(null, true);

      // Allowed list e ache
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // All *.vercel.app (preview deployments)
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // Block
      return callback(new Error(`CORS not allowed from origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// ==========================================
// Middleware
// ==========================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

// ==========================================
// Routes
// ==========================================
app.get("/", (req, res) => {
  res.status(200).send("Home page - Kroyshala API");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/seed", seedRouter);
app.use("/api/search", searchRouter);

// ==========================================
// 404 Handler
// ==========================================
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// ==========================================
// Global Error Handler
// ==========================================
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`❌ [Error] ${statusCode}: ${message}`);
  console.error("Stack:", err.stack);

  return errorResponse(res, {
    statusCode: statusCode,
    message: message,
  });
});

module.exports = app;
