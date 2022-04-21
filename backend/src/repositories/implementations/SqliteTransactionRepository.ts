import { Prisma, PrismaClient } from "@prisma/client";
import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../ITransactionRepository";

export class SqliteTransactionRepository implements ITransactionRepository {
  constructor(private prismaClient: PrismaClient) {}
  async saveList(transactions: Transaction[]): Promise<void> {
    transactions.forEach(async (transaction) => {
      await this.prismaClient.transaction.create({ data: transaction });
    });
  }

  async save(transaction: Transaction): Promise<void> {
    await this.prismaClient.transaction.create({ data: transaction });
  }
}
