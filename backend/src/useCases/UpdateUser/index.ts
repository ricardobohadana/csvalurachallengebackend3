import { sqliteUserRepository } from "../../repositories";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

const updateUserUseCase = new UpdateUserUseCase(sqliteUserRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);
