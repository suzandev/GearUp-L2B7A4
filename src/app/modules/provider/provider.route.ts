import { Router } from "express";
import { ProviderController } from "./provider.controller";
import { GearController } from "../gear/gear.controller";
import { RentalController } from "../rental/rental.controller";
import {
  authMiddleware,
  requireRoles,
} from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware, requireRoles("PROVIDER"));
router.post("/gear", GearController.createGear);
router.put("/gear/:id", ProviderController.updateGear);
router.delete("/gear/:id", ProviderController.deleteGear);
router.get("/orders", RentalController.getUserOrders);
router.patch("/orders/:id", ProviderController.updateOrderStatus);

export const ProviderRoutes = router;
