import express from "express";
import cors from "cors";
import { authRoutes } from "./app/modules/auth/auth.route";
import { GearRoutes } from "./app/modules/gear/gear.route";
import { errorHandler } from "./app/middlewares/error.middleware";
import { CategoryRoutes } from "./app/modules/category/category.route";
import { RentalRoutes } from "./app/modules/rental/rental.route";
import { PaymentRoutes } from "./app/modules/payment/payment.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/gear", GearRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/rentals", RentalRoutes);
app.use("/api/payments", PaymentRoutes);
app.use(errorHandler);

export default app;
