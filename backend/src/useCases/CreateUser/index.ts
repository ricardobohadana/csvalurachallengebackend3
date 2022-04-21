import { mailTrapMailProvider } from "../../providers";
import { sqliteUserRepository } from "../../repositories";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const createUserUseCase = new CreateUserUseCase(
  sqliteUserRepository,
  mailTrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
