import {
  sqliteTransactionRepository,
  sqliteUserRepository,
} from "../../repositories";
import { ReportTransactionsController } from "./ReportTransactionsController";
import { ReportTransactionsUseCase } from "./ReportTransactionsUseCase";

const reportTransactionsUseCase = new ReportTransactionsUseCase(
  sqliteTransactionRepository
);

const reportTransactionsController = new ReportTransactionsController(
  reportTransactionsUseCase
);

export { reportTransactionsUseCase, reportTransactionsController };
