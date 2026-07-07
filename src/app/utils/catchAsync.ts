import { NextFunction, Request, RequestHandler, Response } from "express";

const INTERNAL_SERVER_ERROR = 500;

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: INTERNAL_SERVER_ERROR,
        message: "User registration failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
};
