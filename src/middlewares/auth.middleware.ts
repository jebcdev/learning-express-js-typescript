import { Request, Response, NextFunction } from "express";

import { JwtUtil } from "../utils/jwt.util.js";

export const verifyTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decodedToken = await JwtUtil.VerifyToken(token);
        const email = decodedToken.email;

        if (!email) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = { email };
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Error verifying token",
            data: error as string,
        });
    }
};
