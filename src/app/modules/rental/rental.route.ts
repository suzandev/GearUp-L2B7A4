import { Router } from "express";
import { RentalController } from "./rental.controller";
import { RentalValidation } from "./rental.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  authMiddleware,
  requireRoles,
} from "../../middlewares/auth.middleware";

const router = Router();
router.post(
  "/",
  authMiddleware,
  requireRoles("CUSTOMER"),
  validateRequest(RentalValidation.createRentalValidationSchema),
  RentalController.createRentalOrder,
);
router.get("/", authMiddleware, RentalController.getUserOrders);
router.get("/:id", authMiddleware, RentalController.getOrderDetails);

export const RentalRoutes = router;
