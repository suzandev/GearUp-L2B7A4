import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { successResponse } from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const createPaymentIntent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rentalOrderId } = req.body;
    const userId = (req as any).user.id;

    if (!rentalOrderId) {
      const error: any = new Error("Rental Order ID is required");
      error.statusCode = 400;
      return next(error);
    }

    const data = await PaymentService.createPaymentIntent(
      rentalOrderId,
      userId,
    );
    return successResponse(
      res,
      201,
      data,
      "Payment intent created successfully",
    );
  },
);

const confirmPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.body;

    if (!transactionId) {
      const error: any = new Error("Transaction ID is required");
      error.statusCode = 400;
      return next(error);
    }

    const data = await PaymentService.confirmPayment(transactionId);
    return successResponse(
      res,
      200,
      data,
      "Payment confirmed and order placed successfully",
    );
  },
);

export const PaymentController = {
  createPaymentIntent,
  confirmPayment,
};
