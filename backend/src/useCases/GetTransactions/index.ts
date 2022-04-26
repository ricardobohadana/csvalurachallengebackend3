import { sqliteTransactionRepository } from "../../repositories";
import { GetTransactionsController } from "./GetTransactionsController";
import { GetTransactionsUseCase } from "./GetTransactionsUseCase";

const getTransactionsUseCase = new GetTransactionsUseCase(
  sqliteTransactionRepository
);

const getTransactionsController = new GetTransactionsController(
  getTransactionsUseCase
);

export { getTransactionsUseCase, getTransactionsController };
