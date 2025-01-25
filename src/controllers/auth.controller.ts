import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import { BcryptUtil } from "../utils/bcrypt.util.js";
import { JwtUtil } from "../utils/jwt.util.js";

const DbClient = new PrismaClient();

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body; //crear el schema para validar los datos ZOD

        const user = await DbClient.user.findUnique({
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

        const isPasswordValid = await BcryptUtil.ComparePassword(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Password",
                data: null,
            });
        }

        const token = await JwtUtil.GenerateToken(email);

        res.status(200).json({
            message: "User Logged In",
            data: user,
            token: token,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error While Logging In...",
            data: error,
        });
    }
};

const register = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        userData.password = await BcryptUtil.HashPassword(
            userData.password
        );

        const newUser = await DbClient.user.create({
            data: userData,
        });

        if (!newUser) {
            return res.status(400).json({
                message: "User not created",
                data: null,
            });
        } else {
            const token = await JwtUtil.GenerateToken(newUser.email);
            return res.status(201).json({
                message: "User Registered",
                data: newUser,
                token: token,
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: "Error While Registering User...",
            data: error,
        });
    }
};

const profile = async (req: Request, res: Response) => {
    try {
        const email = req?.user?.email;

        const user = await DbClient.user.findUnique({
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
    } catch (error) {
        res.status(400).json({
            message: "Error While Fetching Profile...",
            data: error,
        });
    }
};

export const authController = {
    login,
    register,
    profile,
};
