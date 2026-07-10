import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateRequest = (schema: ZodTypeAny) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error: any) {
      const errorDetails = error.errors?.map((err: any) => ({
        field: err.path[err.path.length - 1],
        message: err.message,
      }));

      const validationError: any = new Error("Validation Error");
      validationError.statusCode = 400;
      validationError.errorDetails = errorDetails || error;

      next(validationError);
    }
  };
};
