import { Router } from "express";
import { appController } from "../controllers/_app.controller";

export const appRouter: Router = Router();

appRouter.get("/", appController.index);