"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseUtil = void 0;
const ErrorResponse = (res_1, message_1, data_1, ...args_1) => __awaiter(void 0, [res_1, message_1, data_1, ...args_1], void 0, function* (res, message, data, statusCode = 500) {
    try {
        return yield res.status(statusCode).json({ message, data });
    }
    catch (error) {
        return yield res.status(statusCode).json({
            message: "Internal Server Error",
            data: error,
        });
    }
});
const SuccessResponse = (res_1, message_1, data_1, ...args_1) => __awaiter(void 0, [res_1, message_1, data_1, ...args_1], void 0, function* (res, message, data, statusCode = 200) {
    try {
        return yield res.status(statusCode).json({ message, data });
    }
    catch (error) {
        return ErrorResponse(res, "Internal Server Error", error, 500);
    }
});
exports.responseUtil = {
    ErrorResponse,
    SuccessResponse,
};
