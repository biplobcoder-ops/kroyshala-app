
const mongoose = require("mongoose");

// ==========================================
// MongoDB Transaction Helper
// ==========================================

const withTransaction = async (callback) => {
  const session = await mongoose.startSession();

  try {
    let result;

    await session.withTransaction(async () => {
      result = await callback(session);
    });

    return result;
  } catch (error) {
    throw error;
  } finally {
    await session.endSession();
  }
};

module.exports = withTransaction;

