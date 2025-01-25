import { Request, Response,NextFunction } from "express";

import { JwtUtil } from "../utils/jwt.util.js";

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const { email, isAdmin } = await JwtUtil.VerifyToken(token);

        if (!email) {
            return res.status(401).json({ message: "Invalid token" });
        }

        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = { email, isAdmin };
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Error verifying token",
            data: error as string,
        });
    }
};