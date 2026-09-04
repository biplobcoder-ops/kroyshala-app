import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    token: z
      .string()
      .min(1, "Reset token is required."),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(100, "Password is too long."),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your new password."),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    }
  );