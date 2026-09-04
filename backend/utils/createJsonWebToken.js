const jwt = require("jsonwebtoken");

const createJsonWebToken = (payload, secretKey, expiresIn) => {
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Payload must be a non-empty object");
  }

  if (typeof secretKey !== "string" || secretKey.trim() === "") {
    throw new Error("Secret key must be a non-empty string");
  }

  return jwt.sign(payload, secretKey, { expiresIn });
};

module.exports = createJsonWebToken;