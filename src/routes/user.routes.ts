import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyIdMiddleware } from "../middlewares/verifyId.middleware";

export const userRoutes:Router = Router();


userRoutes.get("/",userController.getAll);
userRoutes.get("/:id",verifyIdMiddleware,userController.getById);
userRoutes.post("/",userController.create);
userRoutes.patch("/:id",verifyIdMiddleware,userController.updateById);
userRoutes.delete("/:id",verifyIdMiddleware,userController.deleteById);