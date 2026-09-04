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
const authRouter = require("./routes/auth.route"); // 🆕 Auth routes
const categoryRouter = require("./routes/category.route");
const productRouter = require("./routes/product.route"); 
const cartRouter = require("./routes/cart.route"); 
const reviewRouter = require("./routes/review.route"); 
const orderRouter = require("./routes/order.route");
const wishlistRouter = require("./routes/wishlist.route");
const dashboardRouter = require("./routes/dashboard.route"); // 🆕
const searchRouter = require("./routes/search.route");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Home page - Kroyshala API");
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter); // 🆕 Auth routes
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter); 
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter); // 🆕
app.use("/api/wishlist", wishlistRouter)
app.use("/api/dashboard", dashboardRouter); 
app.use("/api/seed", seedRouter);
app.use("/api/search", searchRouter);

// 404 Handler - http-errors use করছি
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  // ✅ http-errors থেকে আসা error handle করবো
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  return errorResponse(res, {
    statusCode: statusCode,
    message: message,
  });
});

module.exports = app;