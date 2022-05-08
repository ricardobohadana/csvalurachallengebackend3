import { mailJetMailProvider, mailTrapMailProvider } from "../../providers";
import { sqliteUserRepository } from "../../repositories";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const createUserUseCase = new CreateUserUseCase(
  sqliteUserRepository,
  mailJetMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
