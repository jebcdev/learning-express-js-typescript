import express, { Response } from "express";

export type TResponseUtil = {
    ErrorResponse: (
        res: Response,
        message: string,
        data: object,
        statusCode?: number
    ) => Promise<Response>;
    
    SuccessResponse: (
        res: Response,
        message: string,
        data: object,
        statusCode?: number
    ) => Promise<Response>;
};

const ErrorResponse  =async (res: Response,message: string,data: object,statusCode: number = 500
) => {
    try {
        return await res.status(statusCode).json({ message, data });
    } catch (error) {
        return await res.status(statusCode).json({
            message: "Internal Server Error",
            data: error,
        });
    }
};

const SuccessResponse = async(
    res: Response,
    message: string,
    data: object,
    statusCode: number = 200
):Promise<Response> => {
    try {
        return await res.status(statusCode).json({ message, data });
    } catch (error) {
        return ErrorResponse(
            res,
            "Internal Server Error",
            error as object,
            500
        );
    }
};


export const responseUtil: TResponseUtil = {
    ErrorResponse,
    SuccessResponse,
};