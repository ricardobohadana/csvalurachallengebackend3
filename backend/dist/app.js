"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.EMAIL_SECRET_KEY = exports.EMAIL_API_KEY = exports.SECRET = void 0;
// import Dinero from "dinero.js";
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
//import {} from "dinero.js/";
// Dinero.globalLocale = "pt-BR";
// Dinero.defaultCurrency = "BRL";
exports.SECRET = process.env.SECRET_KEY;
exports.EMAIL_API_KEY = process.env.EMAIL_API_KEY;
exports.EMAIL_SECRET_KEY = process.env.EMAIL_SECRET_KEY;
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", routes_1.router);