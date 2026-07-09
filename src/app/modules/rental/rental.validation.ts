import { z } from "zod";

const createRentalValidationSchema = z.object({
  body: z.object({
    startDate: z
      .string({ message: "Start date must be a valid date string" })
      .datetime({ message: "Invalid ISO datetime string" }),
    endDate: z
      .string({ message: "End date must be a valid date string" })
      .datetime({ message: "Invalid ISO datetime string" }),
    items: z
      .array(
        z.object({
          gearId: z.string({ message: "Gear ID must be a valid string" }),
          quantity: z
            .number({ message: "Quantity must be a number" })
            .int({ message: "Quantity must be a whole integer" })
            .positive({ message: "Quantity must be a positive integer" }),
        }),
      )
      .min(1, { message: "At least one gear item must be rented" }),
  }),
});

const updateStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(
      ["PENDING", "CONFIRMED", "PICKED_UP", "RETURNED", "CANCELLED"],
      {
        message: "Invalid status value",
      },
    ),
  }),
});

export const RentalValidation = {
  createRentalValidationSchema,
  updateStatusValidationSchema,
};
