import { Router } from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerSchema),
  authController.register,
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginSchema),
  authController.login,
);
router.get("/me", authMiddleware, authController.me);

export const authRoutes = router;
