require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 5000,                              // ✅ Default
    nodeEnv: process.env.NODE_ENV || "development",
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  },
  db: {
    url: process.env.MONGODB_URL,
  },
};

module.exports = dev;
