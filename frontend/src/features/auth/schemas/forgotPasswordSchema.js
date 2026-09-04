import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
});

export {
  forgotPasswordSchema,
};