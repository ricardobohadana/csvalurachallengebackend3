import { sqliteUserRepository } from "../../repositories";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const authenticateUserUseCase = new AuthenticateUserUseCase(
  sqliteUserRepository
);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

export { authenticateUserUseCase, authenticateUserController };
