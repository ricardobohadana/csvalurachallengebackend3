"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUserController = exports.authorizeUserUseCase = void 0;
const AuthorizeUserController_1 = require("./AuthorizeUserController");
const AuthorizeUserUseCase_1 = require("./AuthorizeUserUseCase");
const authorizeUserUseCase = new AuthorizeUserUseCase_1.AuthorizeUserUseCase();
exports.authorizeUserUseCase = authorizeUserUseCase;
const authorizeUserController = new AuthorizeUserController_1.AuthorizeUserController(authorizeUserUseCase);
exports.authorizeUserController = authorizeUserController;
