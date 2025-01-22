"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIdMiddleware = void 0;
const responses_util_1 = require("../utils/responses.util");
const verifyIdMiddleware = (req, res, next) => {
    if (!req.params.id)
        return responses_util_1.responseUtil.ErrorResponse(res, "Id Is Required", {});
    if (isNaN(parseInt(req.params.id)))
        return responses_util_1.responseUtil.ErrorResponse(res, "Id Must Be A Number", {});
    next();
};
exports.verifyIdMiddleware = verifyIdMiddleware;
