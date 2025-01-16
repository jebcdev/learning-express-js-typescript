import { Router } from "express";
import { userController } from "../controllers/user.controller";


export const userRoutes:Router = Router();


userRoutes.get("/",userController.getAll);
userRoutes.get("/:id",userController.getById);
userRoutes.post("/",userController.create);
userRoutes.patch("/:id",userController.updateById);
userRoutes.delete("/:id",userController.deleteById);