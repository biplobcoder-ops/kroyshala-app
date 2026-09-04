
const { Redis } = require("@upstash/redis");

let redisClient = null;
let isRedisConnected = false;

// ==========================================
// Initialize Upstash Redis
// ==========================================

try {
  // Upstash Redis থেকে environment variables নেওয়া হবে
  redisClient = Redis.fromEnv();

  // Upstash HTTP-based Redis-এর জন্য
  // আলাদা connection event প্রয়োজন হয় না
  isRedisConnected = true;

  console.log("✅ Redis (Upstash) initialized successfully");
} catch (error) {
  console.error("❌ Redis initialization failed:", error.message);
  isRedisConnected = false;
}

// ==========================================
// Set Cache
// expiry = seconds
// ==========================================

const setCache = async (key, data, expiry = 300) => {
  if (!isRedisConnected || !redisClient) {
    return false;
  }

  try {
    await redisClient.set(key, JSON.stringify(data), {
      ex: expiry,
    });

    return true;
  } catch (error) {
    console.error("❌ Cache set error:", error.message);
    return false;
  }
};

// ==========================================
// Get Cache
// ==========================================

const getCache = async (key) => {
  if (!isRedisConnected || !redisClient) {
    return null;
  }

  try {
    const data = await redisClient.get(key);

    // Cache পাওয়া যায়নি
    if (data === null || data === undefined) {
      return null;
    }

    // ==========================================
    // Important:
    // Upstash কখনো কখনো already parsed object
    // return করতে পারে।
    // তাই object হলে JSON.parse() করা যাবে না।
    // ==========================================

    if (typeof data === "object") {
      return data;
    }

    // String হলে JSON parse করার চেষ্টা করবো
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (parseError) {
        // Valid JSON না হলে raw string return করবে
        return data;
      }
    }

    // অন্য কোনো primitive value হলে সরাসরি return
    return data;
  } catch (error) {
    console.error("❌ Cache get error:", error.message);
    return null;
  }
};

// ==========================================
// Delete Single Cache
// ==========================================

const deleteCache = async (key) => {
  if (!isRedisConnected || !redisClient) {
    return false;
  }

  try {
    await redisClient.del(key);

    return true;
  } catch (error) {
    console.error("❌ Cache delete error:", error.message);
    return false;
  }
};

// ==========================================
// Delete Cache By Pattern
// Example:
// products:*
// categories:*
// ==========================================

const deleteCacheByPattern = async (pattern) => {
  if (!isRedisConnected || !redisClient) {
    return false;
  }

  try {
    const keys = await redisClient.keys(pattern);

    if (keys.length === 0) {
      return true;
    }

    await redisClient.del(...keys);

    return true;
  } catch (error) {
    console.error("❌ Cache pattern delete error:", error.message);
    return false;
  }
};

// ==========================================
// Export
// ==========================================

module.exports = {
  redisClient,
  setCache,
  getCache,
  deleteCache,
  deleteCacheByPattern,
};

