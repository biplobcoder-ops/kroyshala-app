const { z } = require("zod");

// Register validation
const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),

  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladesh phone number"),

  address: z.object({
    street: z.string().trim().default(""),
    city: z.string().trim().default(""),
    postalCode: z.string().trim().default(""),
    country: z.string().trim().default("Bangladesh"),
  }),
});

// ✅ Verify email - only token needed
const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .optional(),

  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladesh phone number")
    .optional(),

  address: z.object({
    street: z.string().trim().optional(),
    city: z.string().trim().optional(),
    postalCode: z.string().trim().optional(),
    country: z.string().trim().optional(),
  }).optional(),
});

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(100, "New password is too long"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password do not match",
    path: ["confirmPassword"],
  });

  const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
});

// Reset password validation
const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your new password"),
});


module.exports = {
  registerUserSchema,
  verifyEmailSchema,
   updateProfileSchema,
   changePasswordSchema,
  forgotPasswordSchema, // 🆕
  resetPasswordSchema, // 🆕
};