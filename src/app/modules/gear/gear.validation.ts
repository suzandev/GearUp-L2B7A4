import { z } from "zod";

const createGearValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Gear name is required" })
      .min(3, "Name must be at least 3 characters long"),
    description: z.string().optional(),
    brand: z.string().optional(),
    pricePerDay: z
      .number({ message: "Price per day must be a number" })
      .positive("Price must be a positive number"),
    stock: z
      .number({ message: "Stock must be a number" })
      .int()
      .min(1, "Stock must be at least 1"),
    image: z.string().url({ message: "Image must be a valid URL" }).optional(),
    providerId: z.string({ message: "Provider ID is required" }),
    categoryId: z.string({ message: "Category ID is required" }),
  }),
});

const updateGearValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    brand: z.string().optional(),
    pricePerDay: z.number().positive().optional(),
    stock: z.number().int().min(0).optional(),
    image: z.string().url().optional(),
    available: z.boolean().optional(),
  }),
});

export const GearValidation = {
  createGearValidationSchema,
  updateGearValidationSchema,
};
