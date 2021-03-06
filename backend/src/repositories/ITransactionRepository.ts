import { Transaction } from "../entities/Transaction";
import { TransactionGroup } from "../models/TransactionGroup";

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
  saveList(transaction: Transaction[]): Promise<void>;
  selectGroupedTransactions(): Promise<TransactionGroup[]>;
  getByDate(date: Date): Promise<Transaction[]>;
  getAll(): Promise<Transaction[]>;
  getByMonthAndYear(month: number, year: number): Promise<Transaction[]>;
}
