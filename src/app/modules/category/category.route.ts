import { Router } from "express";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  authMiddleware,
  requireRoles,
} from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireRoles("ADMIN"),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory,
);
router.get("/", CategoryController.getAllCategories);

export const CategoryRoutes = router;
