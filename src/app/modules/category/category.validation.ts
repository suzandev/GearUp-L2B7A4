import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Category name must be a valid string" })
      .min(2, { message: "Name must be at least 2 characters long" }),
    description: z.string().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
};
