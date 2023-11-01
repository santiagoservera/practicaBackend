import { Application } from "express";
import userRoutes from "../routes/user.route";
import productRoutes from "../routes/product.route"
import authRoutes from "../routes/auth.routes";
import logger from "../utils/logger";

export const register = async (app: Application) => {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/products", productRoutes);
  console.log("🟢 Routes registered");
};
