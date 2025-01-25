"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const zod_1 = __importDefault(require("zod"));
const user_validation_1 = require("../validations/user.validation");
const createUser = (req, res, next) => {
    try {
        user_validation_1.userValidation.create.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
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
const updateUser = (req, res, next) => {
    try {
        user_validation_1.userValidation.update.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
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
const login = (req, res, next) => {
    try {
        user_validation_1.userValidation.login.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
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
exports.userMiddleware = {
    createUser,
    updateUser,
    login,
};
