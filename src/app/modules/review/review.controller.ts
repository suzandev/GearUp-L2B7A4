import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { successResponse } from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req as any).user.id;

  const data = await ReviewService.createReviewInDB(customerId, req.body);
  return successResponse(res, 201, data, "Review logged successfully");
});

export const ReviewController = {
  createReview,
};
