"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const _app_routes_1 = require("./routes/_app.routes");
const GLOBAL_PREFIX = process.env.GLOBAL_PREFIX || "/api/v1";
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)())
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: true }));
exports.app.use(GLOBAL_PREFIX, _app_routes_1.appRouter);
