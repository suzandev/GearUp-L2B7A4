import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { CategoryService } from "./category.service";
import { successResponse } from "../../utils/sendResponse";

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await CategoryService.createCategory(req.body);

    return successResponse(res, 201, data, "Category created successfully");
  },
);

const getAllCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await CategoryService.getAllCategories();

    return successResponse(res, 200, data, "Categories fetched successfully");
  },
);

export const CategoryController = {
  createCategory,
  getAllCategories,
};
