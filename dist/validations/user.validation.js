"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const create = zod_1.default.object({
    name: zod_1.default.string().min(3).max(100),
    surname: zod_1.default.string().min(3).max(100),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8).max(100),
    isAdmin: zod_1.default.boolean().optional(),
});
const update = zod_1.default.object({
    name: zod_1.default.string().min(3).max(100).optional(),
    email: zod_1.default.string().email().optional(),
    surname: zod_1.default.string().min(3).max(100).optional(),
    password: zod_1.default.string().min(8).max(100).optional(),
    isAdmin: zod_1.default.boolean().optional(),
});
exports.userValidation = {
    create,
    update,
};
