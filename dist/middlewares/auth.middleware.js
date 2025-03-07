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
exports.verifyTokenMiddleware = void 0;
const jwt_util_js_1 = require("../utils/jwt.util.js");
const verifyTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = yield jwt_util_js_1.JwtUtil.VerifyToken(token);
        const email = decodedToken.email;
        if (!email) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = { email };
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Error verifying token",
            data: error,
        });
    }
});
exports.verifyTokenMiddleware = verifyTokenMiddleware;
