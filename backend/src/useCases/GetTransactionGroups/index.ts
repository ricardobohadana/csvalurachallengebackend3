import { sqliteTransactionRepository } from "../../repositories";
import { GetTransactionGroupsController } from "./GetTransactionGroupsController";
import { GetTransactionGroupsUseCase } from "./GetTransactionGroupsUseCase";

const getTransactionGroupsUseCase = new GetTransactionGroupsUseCase(
  sqliteTransactionRepository
);

const getTransactionGroupsController = new GetTransactionGroupsController(
  getTransactionGroupsUseCase
);

export { getTransactionGroupsUseCase, getTransactionGroupsController };
