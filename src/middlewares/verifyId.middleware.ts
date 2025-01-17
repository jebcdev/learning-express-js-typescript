import { Request, Response, NextFunction } from "express";
import { responseUtil } from "../utils/responses.util";


export const verifyIdMiddleware = (req:Request,res:Response,next:NextFunction) => {
    
    if (!req.params.id) return responseUtil.ErrorResponse(res, "Id Is Required", {});

    if (isNaN(parseInt(req.params.id))) return responseUtil.ErrorResponse(res, "Id Must Be A Number", {});

    next();
};