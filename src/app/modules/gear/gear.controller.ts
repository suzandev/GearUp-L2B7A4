import { Request, Response } from "express";
import { GearService } from "./gear.service";
import { catchAsync } from "../../utils/catchAsync";

const getAllGear = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await GearService.getAllGear();

    res.status(200).json({
      success: true,
      message: "Gear retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

const getSingleGear = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await GearService.getSingleGear(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Gear not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gear retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export const GearController = {
  getAllGear,
  getSingleGear,
};
