import { Router } from "express";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";
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
  validateRequest(ReviewValidation.createReviewValidationSchema),
  (req, res, next) => ReviewController.createReview(req, res, next),
);

export const ReviewRoutes = router;
