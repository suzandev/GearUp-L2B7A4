import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateRequest = (schema: ZodTypeAny) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // Zod স্কিমা অনুযায়ী রিকোয়েস্টের বডি, কুয়েরি এবং প্যারামস ভ্যালিডেশন করা হচ্ছে
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error: any) {
      // Zod এররগুলোকে প্রসেস করে ম্যান্ডেটরি রিকোয়ারমেন্ট অনুযায়ী স্ট্রাকচার্ড ফরম্যাটে নেওয়া
      const errorDetails = error.errors?.map((err: any) => ({
        field: err.path[err.path.length - 1], // কোন ফিল্ডে এরর (যেমন: email, password)
        message: err.message,
      }));

      const validationError: any = new Error("Validation Error");
      validationError.statusCode = 400;
      validationError.errorDetails = errorDetails || error;

      next(validationError);
    }
  };
};
