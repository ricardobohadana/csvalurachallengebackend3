import { sqliteUserRepository } from "../../repositories";
import { GetUserController } from "./GetUserController";
import { GetUserUseCase } from "./GetUserUseCase";

const getUserUseCase = new GetUserUseCase(sqliteUserRepository);

const getUserController = new GetUserController(getUserUseCase);

export { getUserUseCase, getUserController };
