import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { successResponse } from "../../utils/sendResponse";
import { AdminService } from "./admin.service";
import prisma from "../../config/prisma";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await AdminService.getAllUsers();
  return successResponse(
    res,
    200,
    data,
    "All users fetched successfully by admin",
  );
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const { status } = req.body as { status: "ACTIVE" | "SUSPENDED" };

  if (!status) {
    const error: any = new Error("User status field is required");
    error.statusCode = 400;
    throw error;
  }

  const data = await AdminService.updateUserStatus(id, status);
  return successResponse(res, 200, data, `User status updated to ${status}`);
});

const getAllGear = catchAsync(async (req: Request, res: Response) => {
  const data = await AdminService.getAllGear();
  return successResponse(
    res,
    200,
    data,
    "All gear inventory listings fetched by admin",
  );
});

const getAllRentals = catchAsync(async (req: Request, res: Response) => {
  const data = await AdminService.getAllRentals();
  return successResponse(
    res,
    200,
    data,
    "All global platform rental orders fetched by admin",
  );
});

export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};
