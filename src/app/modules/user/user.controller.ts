import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { successResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const data = await UserService.getMyProfileFromDB(userId);

  return successResponse(res, 200, data, "User profile fetched successfully");
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const data = await UserService.updateMyProfileInDB(userId, req.body);

  return successResponse(res, 200, data, "Profile updated successfully");
});

export const UserController = {
  getMyProfile,
  updateMyProfile,
};
