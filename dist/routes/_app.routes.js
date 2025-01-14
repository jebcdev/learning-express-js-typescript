"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const _app_controller_1 = require("../controllers/_app.controller");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.get("/", _app_controller_1.appController.index);
