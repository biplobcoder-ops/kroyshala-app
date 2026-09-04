import { z } from "zod";

export const registerSchema = z
  .object({
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

    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),

    phone: z
      .string()
      .trim()
      .regex(
        /^01[3-9]\d{8}$/,
        "Invalid Bangladesh phone number"
      ),

    address: z.object({
      street: z
        .string()
        .trim()
        .min(1, "Street address is required"),

      city: z
        .string()
        .trim()
        .min(1, "City is required"),

      postalCode: z
        .string()
        .trim()
        .min(1, "Postal code is required"),

      country: z
        .string()
        .trim()
        .min(1, "Country is required"),
    }),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );