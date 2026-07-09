import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.register(req.body);
    return successResponse(res, 201, result, "Registration successful");
  },
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.loginUser(req.body);
    return successResponse(res, 200, result, "Login successful");
  },
);

const me = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    const result = await authService.me(user.id);
    return successResponse(res, 200, result, "Authenticated user fetched");
  },
);

export const authController = {
  register,
  login,
  me,
};
