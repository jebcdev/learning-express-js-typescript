import "dotenv/config";
import cors from "cors";
import express, { Application } from "express";
import { appRouter } from "./routes/_app.routes";
import morgan from "morgan";

const GLOBAL_PREFIX: string = process.env.GLOBAL_PREFIX || "/api/v1";

export const app: Application = express();

app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(morgan("dev"));

app.use(GLOBAL_PREFIX, appRouter);
