import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";
import { responseUtil } from "./responses.util";

const JWT_SECRET = process.env.JWT_SECRET || "aVerySecretString";

const GenerateToken = async (email: string) => {
    try {
        const userData = await userModel.findUnique({
            where: {
                email,
            },
        });

        if (!userData) throw new Error("User not found");

        const token = await jwt.sign(
            {
                email,
                isAdmin: userData.isAdmin,
            },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        if (!token) throw new Error("Error Generating Token");

        return token;
    } catch (error) {
        console.log(error);
        throw new Error(error as string);
    }
};

const VerifyToken = async (token : string) => {
    try {
        const decoded = await jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

        // Validar que el token tenga lo necesario
        if (
            !decoded.email ||
            typeof decoded.isAdmin === "undefined"
        ) {
            throw new Error("Invalid token payload");
        }

        return decoded;
    } catch (error) {
        console.log(error);
        throw new Error("Error Verifying Token");
    }
};

export const JwtUtil = { GenerateToken, VerifyToken };
