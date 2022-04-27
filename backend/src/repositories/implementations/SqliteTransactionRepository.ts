import { Prisma, PrismaClient } from "@prisma/client";
import { Transaction } from "../../entities/Transaction";
import { TransactionGroup } from "../../models/TransactionGroup";
import { ITransactionRepository } from "../ITransactionRepository";

export class SqliteTransactionRepository implements ITransactionRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getByDate(date: Date): Promise<Transaction[]> {
    const data = await this.prismaClient.transaction.findMany();

    const filtered = data.filter(
      (d) =>
        d.dataTransacao.getFullYear() === date.getFullYear() &&
        d.dataTransacao.getMonth() === date.getMonth() &&
        d.dataTransacao.getDate() === date.getDate()
    );

    return filtered;
  }

  async getByUserIdAndDate(
    userId: string,
    dataCadastro: Date
  ): Promise<Transaction[]> {
    const date = dataCadastro
      .toISOString()
      .replace("/", "-")
      .replace("T", " ")
      .replace(".000Z", "");

    const query = Prisma.sql`SELECT * FROM 'Transaction' WHERE dataTransacao=${date}`;

    return (await this.prismaClient.$queryRaw(query)) as Transaction[];
  }

  async getAll(): Promise<Transaction[]> {
    return await this.prismaClient.transaction.findMany();
  }

  async selectGroupedTransactions(): Promise<TransactionGroup[]> {
    const data = await this.prismaClient.transaction.groupBy({
      by: ["dataCadastro", "userId"],
      orderBy: {
        _min: {
          dataTransacao: "desc",
        },
      },
      _count: {
        id: true,
      },
      _min: {
        dataTransacao: true,
      },
    });

    const userData = await this.prismaClient.user.findMany();

    const returnData = data.map((d) => {
      const { password, ...user } = userData.filter(
        (u) => u.id === d.userId
      )[0];
      return new TransactionGroup({
        dataCadastro: d.dataCadastro,
        numDeTransacoes: d._count.id,
        dataTransacoes: d._min.dataTransacao,
        user: user,
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
