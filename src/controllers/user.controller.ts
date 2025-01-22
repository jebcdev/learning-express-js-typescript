import { Request, Response } from "express";
import { TUser } from "../types/user.types";
import { userModel } from "../models/user.model";
import { responseUtil } from "../utils/responses.util";
import { userValidation } from "../validations/user.validation";
import { BcryptUtil } from "../utils/bcrypt.util";

type TUserController = {
    getAll: (req: Request, res: Response) => Promise<Response>;
    getById: (req: Request, res: Response) => Promise<Response>;
    create: (req: Request, res: Response) => Promise<Response>;
    updateById: (req: Request, res: Response) => Promise<Response>;
    deleteById: (req: Request, res: Response) => Promise<Response>;
};

const getAll = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const users: TUser[] | null = await userModel.findMany({
            orderBy: [
                {
                    id: "desc",
                },
            ],
        });

        if (!users)
            return responseUtil.ErrorResponse(
                res,
                "Users Not Found",
                {}
            );

        // return responseUtil.SuccessResponse(res, "Users List", users);
        const isMatch:boolean|void= await BcryptUtil.ComparePassword("12345678","$2a$10$Yj9XmSW0yTbylsr6NQ0/POrDIFeyshs9ljAFWoPdDDMB7BXNT2sfG");
        return responseUtil.SuccessResponse(res, "match?", {isMatch});
    } catch (error) {
        console.log(error);

        return responseUtil.ErrorResponse(
            res,
            "Internal Server Error",
            error as object
        );
    }
};

const getById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id: number = parseInt(req.params.id);
        const user: TUser | null = await userModel.findUnique({
            where: {
                id: id,
            },
        });

        if (!user)
            return responseUtil.ErrorResponse(
                res,
                "User Not Found",
                {}
            );

        return responseUtil.SuccessResponse(res, "User Found", user);
    } catch (error) {
        console.log(error);

        return responseUtil.ErrorResponse(
            res,
            "Internal Server Error",
            error as object
        );
    }
};

const create = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const data = userValidation.create.parse(req.body);

        data.password = (await BcryptUtil.HashPassword(
            data.password
        )) as string;

        const newUser = await userModel.create({
            data,
        });

        if (!newUser)
            return responseUtil.ErrorResponse(
                res,
                "User Not Created",
                {}
            );

        return responseUtil.SuccessResponse(
            res,
            "User Created",
            newUser
        );
    } catch (error) {
        console.log(error);

        return responseUtil.ErrorResponse(
            res,
            "Internal Server Error",
            error as object
        );
    }
};

const updateById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id: number = parseInt(req.params.id);

        const data = userValidation.update.parse(req.body);

        if (data.password) {
            data.password = (await BcryptUtil.HashPassword(
                data.password
            )) as string;
        }

        const updatedUser = await userModel.update({
            where: {
                id,
            },
            data,
        });

        if (!updatedUser)
            return responseUtil.ErrorResponse(
                res,
                "User Not Updated",
                {}
            );

        return responseUtil.SuccessResponse(
            res,
            "User Updated",
            updatedUser
        );
    } catch (error) {
        console.log(error);

        return responseUtil.ErrorResponse(
            res,
            "Internal Server Error",
            error as object
        );
    }
};

const deleteById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id: number = parseInt(req.params.id);

        const deletedUser = await userModel.delete({
            where: {
                id,
            },
        });

        if (!deletedUser)
            responseUtil.ErrorResponse(res, "User Not Deleted", {});

        return responseUtil.SuccessResponse(res, "User Deleted", {
            deletedUser,
        });
    } catch (error) {
        console.log(error);

        return responseUtil.ErrorResponse(
            res,
            "Internal Server Error",
            error as object
        );
    }
};

export const userController: TUserController = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
