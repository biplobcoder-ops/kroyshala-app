const { z } = require("zod");

// Login validation
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

module.exports = {
  loginSchema,
};