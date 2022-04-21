import { sqliteTransactionRepository } from "../../repositories";
import { CreateTransactionController } from "./CreateTransactionController";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

const createTransactionUseCase = new CreateTransactionUseCase(
  sqliteTransactionRepository
);

const createTransactionController = new CreateTransactionController(
  createTransactionUseCase
);

export { createTransactionUseCase, createTransactionController };
