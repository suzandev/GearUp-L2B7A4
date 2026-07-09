import { Router } from "express";
import { PaymentController } from "./payment.controller";
import {
  authMiddleware,
  requireRoles,
} from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  requireRoles("CUSTOMER"),
  PaymentController.createPaymentIntent,
);

router.post(
  "/confirm",
  authMiddleware,
  requireRoles("CUSTOMER"),
  PaymentController.confirmPayment,
);

export const PaymentRoutes = router;
