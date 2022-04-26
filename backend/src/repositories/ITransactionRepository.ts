import { Transaction } from "../entities/Transaction";
import { TransactionGroup } from "../entities/TransactionGroup";

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
  saveList(transaction: Transaction[]): Promise<void>;
  selectGroupedTransactions(): Promise<TransactionGroup[]>;
  getAll(): Promise<Transaction[]>;
}
