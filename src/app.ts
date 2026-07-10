import express from "express";
import cors from "cors";
import { authRoutes } from "./app/modules/auth/auth.route";
import { GearRoutes } from "./app/modules/gear/gear.route";
import { errorHandler } from "./app/middlewares/error.middleware";
import { CategoryRoutes } from "./app/modules/category/category.route";
import { RentalRoutes } from "./app/modules/rental/rental.route";
import { PaymentRoutes } from "./app/modules/payment/payment.route";
import { AdminRoutes } from "./app/modules/admin/admin.route";
import { ProviderRoutes } from "./app/modules/provider/provider.route";
import { ReviewRoutes } from "./app/modules/review/review.route";
import { UserRoutes } from "./app/modules/user/user.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/gear", GearRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/rentals", RentalRoutes);
app.use("/api/payments", PaymentRoutes);
app.use("/api/provider", ProviderRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use(errorHandler);

export default app;
