import { Request, Response } from "express";
import { TUser } from "../types/user.types";
import { userModel } from "../models/user.model";
import { responseUtil } from "../utils/responses.util";
import { userValidation } from "../validations/user.validation";

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
        const users: TUser[] | null = await userModel.getAll();

        if (!users)
            return responseUtil.ErrorResponse(
                res,
                "Users Not Found",
                {}
            );

        return responseUtil.SuccessResponse(res, "Users List", users);
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
        const user: TUser | null = await userModel.getById(id);

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
        const user: TUser = userValidation.create.parse(req.body);

        const newUser: TUser | null = await userModel.create(user);

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

        const user: TUser = userValidation.update.parse(req.body);

        const updatedUser = await userModel.updateById(id, user);

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

        const deletedUser = await userModel.deleteById(id);

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
