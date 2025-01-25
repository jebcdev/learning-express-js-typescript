"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const _app_controller_1 = require("../controllers/_app.controller");
const user_routes_1 = require("./user.routes");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const isAdmin_middleware_1 = require("../middlewares/isAdmin.middleware");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.get("/", _app_controller_1.appController.index);
exports.appRouter.use("/users", isAdmin_middleware_1.isAdminMiddleware, user_routes_1.userRoutes);
exports.appRouter.use("/auth", auth_routes_1.default);
