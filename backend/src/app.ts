// import Dinero from "dinero.js";
import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import { router } from "./routes";
import cors from "cors";
config();
//import {} from "dinero.js/";

// Dinero.globalLocale = "pt-BR";
// Dinero.defaultCurrency = "BRL";
export const SECRET: string = process.env.SECRET_KEY as string;
export const EMAIL_API_KEY: string = process.env.EMAIL_API_KEY;
export const EMAIL_SECRET_KEY: string = process.env.EMAIL_SECRET_KEY;
export const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.use("/api/v1", router);

export { app };
