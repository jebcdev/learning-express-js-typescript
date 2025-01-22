"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const client_1 = require("@prisma/client");
exports.userModel = new client_1.PrismaClient().user;
