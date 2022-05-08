"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserController = exports.authenticateUserUseCase = void 0;
const repositories_1 = require("../../repositories");
const AuthenticateUserController_1 = require("./AuthenticateUserController");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
const authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(repositories_1.sqliteUserRepository);
exports.authenticateUserUseCase = authenticateUserUseCase;
const authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController(authenticateUserUseCase);
exports.authenticateUserController = authenticateUserController;