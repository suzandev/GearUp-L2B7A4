import { Router } from "express";
import { GearController } from "./gear.controller";
import {
  authMiddleware,
  requireRoles,
} from "../../middlewares/auth.middleware";
const router = Router();
router.post(
  "/",
  authMiddleware,
  requireRoles("PROVIDER"),
  GearController.createGear,
);
router.get("/", GearController.getAllGear);
router.get("/:id", GearController.getSingleGear);

export const GearRoutes = router;
