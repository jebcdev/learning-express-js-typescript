import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { authController } from "../controllers/auth.controller.js";
import { verifyTokenMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/login", userMiddleware.login, authController.login);
authRoutes.post("/register", userMiddleware.createUser, authController.register);
authRoutes.get("/profile", verifyTokenMiddleware, authController.profile);

export default authRoutes;