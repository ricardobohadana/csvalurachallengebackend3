// import Dinero from "dinero.js";
import { config } from "dotenv";
config();

export const SECRET: string = process.env.SECRET_KEY as string;
export const EMAIL_API_KEY: string = process.env.EMAIL_API_KEY as string;
export const EMAIL_SECRET_KEY: string = process.env.EMAIL_SECRET_KEY as string;
export const PORT = process.env.PORT;

import express from "express";
import fileUpload from "express-fileupload";
import { router } from "./routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.use("/api/v1", router);

export { app };
