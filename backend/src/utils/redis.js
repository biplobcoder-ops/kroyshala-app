const redis = require("redis");

let redisClient = null;
let isRedisConnected = false;

try {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });

  redisClient.on("connect", () => {
    console.log("✅ Redis connected successfully");
    isRedisConnected = true;
  });

  redisClient.on("error", (err) => {
    console.error("Redis error:", err.message);
    isRedisConnected = false;
  });

  redisClient.connect().catch((err) => {
    console.error("Redis connection failed:", err.message);
    isRedisConnected = false;
  });
} catch (error) {
  console.error("Redis initialization failed:", error.message);
  isRedisConnected = false;
}

const setCache = async (key, data, expiry = 300) => {
  if (!isRedisConnected || !redisClient?.setEx) return false;
  try {
    await redisClient.setEx(key, expiry, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Cache set error:", error.message);
    return false;
  }
};

const getCache = async (key) => {
  if (!isRedisConnected || !redisClient?.get) return null;
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Cache get error:", error.message);
    return null;
  }
};

const deleteCache = async (key) => {
  if (!isRedisConnected || !redisClient?.del) return false;
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error("Cache delete error:", error.message);
    return false;
  }
};

const deleteCacheByPattern = async (pattern) => {
  if (!isRedisConnected || !redisClient?.keys) return false;
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) await redisClient.del(keys);
    return true;
  } catch (error) {
    console.error("Cache pattern delete error:", error.message);
    return false;
  }
};

module.exports = {
  redisClient,
  setCache,
  getCache,
  deleteCache,
  deleteCacheByPattern,
};