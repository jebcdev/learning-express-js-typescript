"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const _app_controller_1 = require("../controllers/_app.controller");
const user_routes_1 = require("./user.routes");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.get("/", _app_controller_1.appController.index);
exports.appRouter.use("/users", user_routes_1.userRoutes);
