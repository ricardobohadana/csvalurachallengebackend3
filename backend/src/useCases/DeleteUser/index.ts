import { sqliteUserRepository } from "../../repositories";
import { SqliteUserRepository } from "../../repositories/implementations/SqliteUserRepository";
import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

const deleteUserUseCase = new DeleteUserUseCase(sqliteUserRepository);

const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
