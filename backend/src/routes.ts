import { Router } from "express";
import { authenticateUserController } from "./useCases/AuthenticateUser";
import { authorizeUserController } from "./useCases/AuthorizeUser";
import { createTransactionController } from "./useCases/CreateTransaction";
import { createUserController } from "./useCases/CreateUser";

const router = Router();

router.post("/users", (request, response) => {
  return createUserController.handle(request, response);
});

router.post("/login", (request, response) => {
  return authenticateUserController.handle(request, response);
});

router.get("/checkAuth", (request, response) => {
  return authorizeUserController.handle(request, response, null);
});

router.use("/transactions", (request, response, next) => {
  return authorizeUserController.handle(request, response, next);
});
router.post("/transactions", (request, response) => {
  return createTransactionController.handle(request, response);
  return response.status(200).json(request.body);
});

export { router };
