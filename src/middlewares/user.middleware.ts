import {Request,Response,NextFunction} from "express";
import z from "zod";
import { userValidation } from "../validations/user.validation";


const createUser = (req:Request, res:Response, next:NextFunction) => {
    try {
        userValidation.create.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message,
            }));

            return res.status(400).json({
                message: "Error Creating User",
                data: errors,
            });
        }

        res.status(400).json({
            message: "Error While Creating User...",
            data: error,
        });
    }
};

const updateUser = (req:Request, res:Response, next:NextFunction) => {
    try {
        userValidation.update.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message,
            }));

            return res.status(400).json({
                message: "Error Updating User",
                data: errors,
            });
        }

        res.status(400).json({
            message: "Error While Updating User...",
            data: error,
        });
    }
};

const login = (req:Request, res:Response, next:NextFunction) => {
    try {
        userValidation.login.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message,
            }));

            return res.status(400).json({
                message: "Error Logging In",
                data: errors,
            });
        }

        res.status(400).json({
            message: "Error While Updating User...",
            data: error,
        });
    }
};

export const userMiddleware = {
    createUser,
    updateUser,
    login,
};