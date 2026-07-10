import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { successResponse } from "../../utils/sendResponse";
import { ProviderService } from "./provider.service";

const updateGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = (req as any).user.id;
  const { id } = req.params as { id: string };

  const data = await ProviderService.updateGearListing(
    id,
    providerId,
    req.body,
  );
  return successResponse(
    res,
    200,
    data,
    "Gear item modified successfully in inventory",
  );
});

const deleteGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = (req as any).user.id;
  const { id } = req.params as { id: string };

  await ProviderService.removeGearListing(id, providerId);
  return successResponse(
    res,
    200,
    null,
    "Gear inventory listing erased successfully",
  );
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const providerId = (req as any).user.id;
  const { id } = req.params as { id: string };
  const { status } = req.body as {
    status: "CONFIRMED" | "PICKED_UP" | "RETURNED" | "CANCELLED";
  };

  const data = await ProviderService.updateRentalStatusByProvider(
    id,
    providerId,
    status,
  );
  return successResponse(
    res,
    200,
    data,
    `Order processing state updated to ${status}`,
  );
});

export const ProviderController = {
  updateGear,
  deleteGear,
  updateOrderStatus,
};
