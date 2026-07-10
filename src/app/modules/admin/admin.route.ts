import { Router } from "express";
import { AdminController } from "./admin.controller";
import {
  authMiddleware,
  requireRoles,
} from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware, requireRoles("ADMIN"));

router.get("/users", AdminController.getAllUsers);
router.patch("/users/:id", AdminController.updateUserStatus);
router.get("/gear", AdminController.getAllGear);
router.get("/rentals", AdminController.getAllRentals);

export const AdminRoutes = router;
