import { PrismaClient } from "@prisma/client";

export const userModel=new PrismaClient().user;