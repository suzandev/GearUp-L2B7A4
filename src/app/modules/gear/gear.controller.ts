import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { GearService } from "./gear.service";
import { successResponse } from "../../utils/sendResponse";

const getAllGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await GearService.getAllGear(req.query as any);

    return successResponse(res, 200, data, "Gear items fetched");
  },
);

const getSingleGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Gear id is required",
        errorDetails: null,
      });
    }

    const data = await GearService.getSingleGear(id);

    return successResponse(res, 200, data, "Gear item fetched");
  },
);

const getCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await GearService.getCategories();

    return successResponse(res, 200, data, "Categories fetched");
  },
);

const createGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await GearService.createGear(req.body);

    return successResponse(res, 201, data, "Gear item created successfully");
  },
);

export const GearController = {
  getAllGear,
  getSingleGear,
  getCategories,
  createGear,
};
