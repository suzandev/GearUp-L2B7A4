import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RentalService } from "./rental.service";
import { successResponse } from "../../utils/sendResponse";

const createRentalOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = (req as any).user.id;
    const data = await RentalService.createRentalOrder(customerId, req.body);

    return successResponse(res, 201, data, "Rental order created successfully");
  },
);

const getUserOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId, role } = (req as any).user;
    const data = await RentalService.getUserOrders(userId, role);

    return successResponse(
      res,
      200,
      data,
      "Rental orders fetched successfully",
    );
  },
);

const getOrderDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    const { id: userId, role } = (req as any).user;

    const data = await RentalService.getOrderDetails(id, userId, role);
    return successResponse(
      res,
      200,
      data,
      "Order details fetched successfully",
    );
  },
);

export const RentalController = {
  createRentalOrder,
  getUserOrders,
  getOrderDetails,
};
