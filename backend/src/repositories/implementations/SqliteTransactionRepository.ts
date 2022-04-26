import { PrismaClient } from "@prisma/client";
import { Transaction } from "../../entities/Transaction";
import { TransactionGroup } from "../../entities/TransactionGroup";
import { ITransactionRepository } from "../ITransactionRepository";

export class SqliteTransactionRepository implements ITransactionRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getAll(): Promise<Transaction[]> {
    return await this.prismaClient.transaction.findMany();
  }

  async selectGroupedTransactions(): Promise<TransactionGroup[]> {
    const data = await this.prismaClient.transaction.groupBy({
      by: ["dataCadastro", "userId"],
      orderBy: {
        dataCadastro: "desc",
      },
      _count: {
        id: true,
      },
    });
    const userData = await this.prismaClient.user.findMany();

    const returnData = data.map((d) => {
      const user = userData.filter((u) => u.id === d.userId)[0];
      return new TransactionGroup({
        dataCadastro: d.dataCadastro,
        numOfTransactions: d._count.id,
        userName: user.name,
      });
    });

    return returnData;
  }
  async saveList(transactions: Transaction[]): Promise<void> {
    transactions.forEach(async (transaction) => {
      await this.prismaClient.transaction.create({ data: transaction });
    });
  }

  async save(transaction: Transaction): Promise<void> {
    await this.prismaClient.transaction.create({ data: transaction });
  }
}
