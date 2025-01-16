import { Router } from "express";
import { appController } from "../controllers/_app.controller";
import { userRoutes } from "./user.routes";

export const appRouter: Router = Router();

appRouter.get("/", appController.index);
appRouter.use("/users", userRoutes);