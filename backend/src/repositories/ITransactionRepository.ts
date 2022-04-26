import { Transaction } from "../entities/Transaction";
import { TransactionGroup } from "../models/TransactionGroup";

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
  saveList(transaction: Transaction[]): Promise<void>;
  selectGroupedTransactions(): Promise<TransactionGroup[]>;
  getAll(): Promise<Transaction[]>;
  getByUserIdAndDate(
    userId: string,
    dataCadastro: Date
  ): Promise<Transaction[]>;
}
