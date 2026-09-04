const { z } = require("zod");

// Create product validation
const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(200, "Product name must not exceed 200 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters"),

  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Price must be greater than 0"),

  discountPrice: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 0, "Discount price cannot be negative")
    .optional(),

  brand: z.string().trim().optional(),

  sku: z.string().trim().min(1, "SKU is required"),

  category: z.string().min(1, "Category ID is required"),

  stock: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 0, "Stock cannot be negative"),

  tags: z
    .string()
    .transform((val) => val.split(",").map((tag) => tag.trim()))
    .optional(),

  specifications: z
    .object({
      color: z.string().optional(),
      size: z.string().optional(),
      weight: z.string().optional(),
      material: z.string().optional(),
    })
    .optional(),

  isFeatured: z
    .string()
    .transform((val) => val === "true")
    .optional(),
});

// Update product validation
const updateProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(200, "Product name must not exceed 200 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters")
    .optional(),

  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Price must be greater than 0")
    .optional(),

  discountPrice: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 0, "Discount price cannot be negative")
    .optional(),

  brand: z.string().trim().optional(),

  category: z.string().optional(),

  stock: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 0, "Stock cannot be negative")
    .optional(),

  tags: z
    .string()
    .transform((val) => val.split(",").map((tag) => tag.trim()))
    .optional(),

  isFeatured: z
    .string()
    .transform((val) => val === "true")
    .optional(),

  isActive: z
    .string()
    .transform((val) => val === "true")
    .optional(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};