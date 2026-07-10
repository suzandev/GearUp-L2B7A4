import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    gearId: z.string({
      message: "Gear ID is required and must be a valid string",
    }),
    rating: z
      .number({
        message: "Rating must be a number",
      })
      .int({ message: "Rating must be an integer" })
      .min(1, { message: "Rating must be at least 1 star" })
      .max(5, { message: "Rating cannot be more than 5 stars" }),
    comment: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
};
