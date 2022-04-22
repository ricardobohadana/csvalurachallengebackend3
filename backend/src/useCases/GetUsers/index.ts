import { sqliteUserRepository } from "../../repositories";
import { SqliteUserRepository } from "../../repositories/implementations/SqliteUserRepository";
import { GetUsersController } from "./GetUsersController";
import { GetUsersUseCase } from "./GetUsersUseCase";

const getUsersUseCase = new GetUsersUseCase(sqliteUserRepository);

const getUsersController = new GetUsersController(getUsersUseCase);

export { getUsersUseCase, getUsersController };
