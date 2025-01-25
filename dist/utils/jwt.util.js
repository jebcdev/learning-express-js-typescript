"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET || "aVerySecretString";
const GenerateToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield user_model_1.userModel.findUnique({
            where: {
                email,
            },
        });
        if (!userData)
            throw new Error("User not found");
        const token = yield jsonwebtoken_1.default.sign({
            email,
            isAdmin: userData.isAdmin,
        }, JWT_SECRET, {
            expiresIn: "1h",
        });
        if (!token)
            throw new Error("Error Generating Token");
        return token;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
});
const VerifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Validar que el token tenga lo necesario
        if (!decoded.email ||
            typeof decoded.isAdmin === "undefined") {
            throw new Error("Invalid token payload");
        }
        return decoded;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error Verifying Token");
    }
});
exports.JwtUtil = { GenerateToken, VerifyToken };
