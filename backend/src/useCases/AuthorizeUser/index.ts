import { AuthorizeUserController } from "./AuthorizeUserController";
import { AuthorizeUserUseCase } from "./AuthorizeUserUseCase";

const authorizeUserUseCase = new AuthorizeUserUseCase();

const authorizeUserController = new AuthorizeUserController(
  authorizeUserUseCase
);

export { authorizeUserUseCase, authorizeUserController };
