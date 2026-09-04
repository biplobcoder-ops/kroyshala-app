const { Redis } = require("@upstash/redis");

let redisClient = null;
let isRedisConnected = false;

try {
  // Upstash Redis from environment variables
  redisClient = Redis.fromEnv();

  // Upstash HTTP-based Redis-এর জন্য কোনো আলাদা কানেকশন ইভেন্ট নেই,
  // কিন্তু আমরা ধরে নিচ্ছি ইনিশিয়ালাইজেশন সফল।
  isRedisConnected = true;
  console.log("✅ Redis (Upstash) initialized successfully");
} catch (error) {
  console.error("❌ Redis initialization failed:", error.message);
  isRedisConnected = false;
}

// ক্যাশে ডেটা সেট করো (expiry সেকেন্ডে)
const setCache = async (key, data, expiry = 300) => {
  if (!isRedisConnected || !redisClient) return false;
  try {
    await redisClient.set(key, JSON.stringify(data), { ex: expiry });
    return true;
  } catch (error) {
    console.error("❌ Cache set error:", error.message);
    return false;
  }
};

// ক্যাশে থেকে ডেটা পড়ো
const getCache = async (key) => {
  if (!isRedisConnected || !redisClient) return null;
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("❌ Cache get error:", error.message);
    return null;
  }
};

// নির্দিষ্ট কী ডিলিট করো
const deleteCache = async (key) => {
  if (!isRedisConnected || !redisClient) return false;
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error("❌ Cache delete error:", error.message);
    return false;
  }
};

// প্যাটার্ন অনুযায়ী একাধিক কী ডিলিট করো (যেমন: "products:*")
const deleteCacheByPattern = async (pattern) => {
  if (!isRedisConnected || !redisClient) return false;
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
    return true;
  } catch (error) {
    console.error("❌ Cache pattern delete error:", error.message);
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