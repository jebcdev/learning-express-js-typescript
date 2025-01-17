import { Request, Response } from "express";
import { responseUtil } from "../utils/responses.util";

type TAppController = {
    index: (req: Request, res: Response) => Promise<Response>;
};

const index = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        return responseUtil.SuccessResponse(
            res,
            "Welcome to the API",
            {
                author: "{ JEBC-DeV }",
                version: "0.0.1",
            }
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

export const appController: TAppController = {
    index,
};
