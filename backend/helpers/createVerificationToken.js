const crypto = require("crypto");

const createEmailVerificationToken = () => {
  const token = crypto.randomBytes(32).toString("hex");

  const expires = new Date(
    Date.now() + 15 * 60 * 1000
  );

  return {
    token,
    expires,
  };
};

module.exports = createEmailVerificationToken;