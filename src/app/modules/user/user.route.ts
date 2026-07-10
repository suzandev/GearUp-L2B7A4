import { Router } from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/me", UserController.getMyProfile);

router.patch(
  "/me",
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserController.updateMyProfile,
);

export const UserRoutes = router;
