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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_util_js_1 = require("../utils/bcrypt.util.js");
const jwt_util_js_1 = require("../utils/jwt.util.js");
const DbClient = new client_1.PrismaClient();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body; //crear el schema para validar los datos ZOD
        const user = yield DbClient.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                data: null,
            });
        }
        const isPasswordValid = yield bcrypt_util_js_1.BcryptUtil.ComparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Password",
                data: null,
            });
        }
        const token = yield jwt_util_js_1.JwtUtil.GenerateToken(email);
        res.status(200).json({
            message: "User Logged In",
            data: user,
            token: token,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error While Logging In...",
            data: error,
        });
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        userData.password = yield bcrypt_util_js_1.BcryptUtil.HashPassword(userData.password);
        const newUser = yield DbClient.user.create({
            data: userData,
        });
        if (!newUser) {
            return res.status(400).json({
                message: "User not created",
                data: null,
            });
        }
        else {
            const token = yield jwt_util_js_1.JwtUtil.GenerateToken(newUser.email);
            return res.status(201).json({
                message: "User Registered",
                data: newUser,
                token: token,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error While Registering User...",
            data: error,
        });
    }
});
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
        const user = yield DbClient.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                data: null,
            });
        }
        // const returnUser = {
        //     id: user.id,
        //     email: user.email,
        //     name: user.name,
        //     createdAt: user.createdAt,
        //     updatedAt: user.updatedAt,
        // };
        return res.status(200).json({
            message: "User Profile Fetched",
            data: user,
            // data: returnUser,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error While Fetching Profile...",
            data: error,
        });
    }
});
exports.authController = {
    login,
    register,
    profile,
};
