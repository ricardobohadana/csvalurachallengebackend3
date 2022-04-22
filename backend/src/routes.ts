import { Router } from "express";
import { authenticateUserController } from "./useCases/AuthenticateUser";
import { authorizeUserController } from "./useCases/AuthorizeUser";
import { createTransactionController } from "./useCases/CreateTransaction";
import { createUserController } from "./useCases/CreateUser";
import { getUsersController } from "./useCases/GetUsers";

const router = Router();

// authentication routes

router.post("/register", (request, response) => {
  return createUserController.handle(request, response);
});

router.post("/login", (request, response) => {
  return authenticateUserController.handle(request, response);
});

router.get("/checkAuth", (request, response) => {
  return authorizeUserController.handle(request, response);
});

// users data routes

router.get("/users", (request, response) => {
  return getUsersController.handle(request, response);
});

router.use("/user", (request, response, next) => {
  return authorizeUserController.handle(request, response, next);
});

router.delete("/user/:userId", (request, response) => {
  console.log(request.params.userId);
  return;
});

router.put("/user/:userId", (request, response) => {
  console.log(request.params.userId);
  return;
});

// transaction routes

router.use("/transactions", (request, response, next) => {
  return authorizeUserController.handle(request, response, next);
});
router.post("/transactions", (request, response) => {
  return createTransactionController.handle(request, response);
  return response.status(200).json(request.body);
});

export { router };
