import { Router } from "express";
import { ProviderController } from "./provider.controller";
import { GearController } from "../gear/gear.controller";
import { RentalController } from "../rental/rental.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  authMiddleware,
  requireRoles,
} from "../../middlewares/auth.middleware";
import { GearValidation } from "../gear/gear.validation";
import { RentalValidation } from "../rental/rental.validation";

const router = Router();

router.use(authMiddleware, requireRoles("PROVIDER"));

router.post(
  "/gear",
  validateRequest(GearValidation.createGearValidationSchema),
  GearController.createGear,
);

router.put(
  "/gear/:id",
  validateRequest(GearValidation.updateGearValidationSchema),
  ProviderController.updateGear,
);

router.delete("/gear/:id", ProviderController.deleteGear);
router.get("/orders", RentalController.getUserOrders);
router.patch(
  "/orders/:id",
  validateRequest(RentalValidation.updateStatusValidationSchema),
  (req, res, next) => ProviderController.updateOrderStatus(req, res, next),
);

export const ProviderRoutes = router;
