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
exports.userController = void 0;
const user_model_1 = require("../models/user.model");
const responses_util_1 = require("../utils/responses.util");
const user_validation_1 = require("../validations/user.validation");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.userModel.findMany({
            orderBy: [
                {
                    id: "desc",
                },
            ],
        });
        if (!users)
            return responses_util_1.responseUtil.ErrorResponse(res, "Users Not Found", {});
        return responses_util_1.responseUtil.SuccessResponse(res, "Users List", users);
    }
    catch (error) {
        console.log(error);
        return responses_util_1.responseUtil.ErrorResponse(res, "Internal Server Error", error);
    }
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield user_model_1.userModel.findUnique({
            where: {
                id: id,
            },
        });
        if (!user)
            return responses_util_1.responseUtil.ErrorResponse(res, "User Not Found", {});
        return responses_util_1.responseUtil.SuccessResponse(res, "User Found", user);
    }
    catch (error) {
        console.log(error);
        return responses_util_1.responseUtil.ErrorResponse(res, "Internal Server Error", error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = user_validation_1.userValidation.create.parse(req.body);
        const newUser = yield user_model_1.userModel.create({
            data,
        });
        if (!newUser)
            return responses_util_1.responseUtil.ErrorResponse(res, "User Not Created", {});
        return responses_util_1.responseUtil.SuccessResponse(res, "User Created", newUser);
    }
    catch (error) {
        console.log(error);
        return responses_util_1.responseUtil.ErrorResponse(res, "Internal Server Error", error);
    }
});
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const data = user_validation_1.userValidation.update.parse(req.body);
        const updatedUser = yield user_model_1.userModel.update({
            where: {
                id,
            },
            data,
        });
        if (!updatedUser)
            return responses_util_1.responseUtil.ErrorResponse(res, "User Not Updated", {});
        return responses_util_1.responseUtil.SuccessResponse(res, "User Updated", updatedUser);
    }
    catch (error) {
        console.log(error);
        return responses_util_1.responseUtil.ErrorResponse(res, "Internal Server Error", error);
    }
});
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deletedUser = yield user_model_1.userModel.delete({
            where: {
                id,
            },
        });
        if (!deletedUser)
            responses_util_1.responseUtil.ErrorResponse(res, "User Not Deleted", {});
        return responses_util_1.responseUtil.SuccessResponse(res, "User Deleted", {
            deletedUser,
        });
    }
    catch (error) {
        console.log(error);
        return responses_util_1.responseUtil.ErrorResponse(res, "Internal Server Error", error);
    }
});
exports.userController = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
