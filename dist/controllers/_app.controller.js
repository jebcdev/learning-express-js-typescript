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
exports.appController = void 0;
const responses_util_1 = require("../utils/responses.util");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return responses_util_1.responseUtil.SuccessResponse(res, "Welcome to the API", {
            name: "Learn ExpressJs - TypeScript API",
            author: "{ JEBC-DeV }",
            version: "0.0.1",
        });
    }
    catch (error) {
        console.log(error);
        return responses_util_1.responseUtil.ErrorResponse(res, "Internal Server Error", error);
    }
});
exports.appController = {
    index,
};
