import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role, phone, address } = req.body;

    if (!name || !email || !password || !role) {
      return errorResponse(
        res,
        400,
        "Name, email, password, and role are required",
        null,
      );
    }

    const result = await authService.register({
      name,
      email,
      password,
      role,
      phone,
      address,
    });

    return successResponse(res, 201, result, "Registration successful");
  },
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, "Email and password are required", null);
    }

    const result = await authService.loginUser({ email, password });

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

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    const result = await authService.refreshToken(token);

    return successResponse(res, 200, result, "Token refreshed successfully");
  },
);

export const authController = {
  register,
  login,
  me,
  refreshToken,
};
