"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = exports.createUserUseCase = void 0;
const providers_1 = require("../../providers");
const repositories_1 = require("../../repositories");
const CreateUserController_1 = require("./CreateUserController");
const CreateUserUseCase_1 = require("./CreateUserUseCase");
const createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(repositories_1.sqliteUserRepository, providers_1.mailJetMailProvider);
exports.createUserUseCase = createUserUseCase;
const createUserController = new CreateUserController_1.CreateUserController(createUserUseCase);
exports.createUserController = createUserController;