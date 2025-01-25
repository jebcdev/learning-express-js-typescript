import { Router } from "express";
import { appController } from "../controllers/_app.controller";
import { userRoutes } from "./user.routes";
import authRoutes from "./auth.routes";
import { isAdminMiddleware } from "../middlewares/isAdmin.middleware";

export const appRouter: Router = Router();

appRouter.get("/", appController.index);
appRouter.use("/users",isAdminMiddleware, userRoutes);
appRouter.use("/auth", authRoutes);
