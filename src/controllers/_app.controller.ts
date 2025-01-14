import { Request, Response } from "express";

type TAppController = {
    index: (req: Request, res: Response) => Promise<Response>;
};

const index = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        return res.status(200).json({
            message: "Welcome to the API V1",
            data: {
                author: "{ JEBC-DeV }",
                version: "0.0.1",
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            data: error,
        });
    }
};

export const appController: TAppController = {
    index,
};
