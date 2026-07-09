import { z } from "zod";

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    // required_error এর পরিবর্তে জাস্ট { message: "..." } ব্যবহার করা হয়েছে
    role: z.enum(["CUSTOMER", "PROVIDER", "ADMIN"], {
      message: "Role is required and must be CUSTOMER, PROVIDER, or ADMIN",
    }),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  }),
});

export const AuthValidation = {
  registerSchema,
  loginSchema,
};
