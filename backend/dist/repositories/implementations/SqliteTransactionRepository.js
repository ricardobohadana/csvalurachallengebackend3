"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteTransactionRepository = void 0;
const client_1 = require("@prisma/client");
const TransactionGroup_1 = require("../../models/TransactionGroup");
class SqliteTransactionRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async getByMonthAndYear(month, year) {
        const data = await this.prismaClient.transaction.findMany();
        const filtered = data.filter((d) => d.dataTransacao.getFullYear() === year &&
            d.dataTransacao.getMonth() === month);
        return filtered;
    }
    async getByDate(date) {
        const data = await this.prismaClient.transaction.findMany();
        const filtered = data.filter((d) => d.dataTransacao.getFullYear() === date.getFullYear() &&
            d.dataTransacao.getMonth() === date.getMonth() &&
            d.dataTransacao.getDate() === date.getDate());
        return filtered;
    }
    async getByUserIdAndDate(userId, dataCadastro) {
        const date = dataCadastro
            .toISOString()
            .replace("/", "-")
            .replace("T", " ")
            .replace(".000Z", "");
        const query = client_1.Prisma.sql `SELECT * FROM 'Transaction' WHERE dataTransacao=${date}`;
        return (await this.prismaClient.$queryRaw(query));
    }
    async getAll() {
        return await this.prismaClient.transaction.findMany();
    }
    async selectGroupedTransactions() {
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
            const _a = userData.filter((u) => u.id === d.userId)[0], { password } = _a, user = __rest(_a, ["password"]);
            return new TransactionGroup_1.TransactionGroup({
                dataCadastro: d.dataCadastro,
                numDeTransacoes: d._count.id,
                dataTransacoes: d._min.dataTransacao,
                user: user,
            });
        });
        return returnData;
    }
    async saveList(transactions) {
        transactions.forEach(async (transaction) => {
            await this.prismaClient.transaction.create({ data: transaction });
        });
    }
    async save(transaction) {
        await this.prismaClient.transaction.create({ data: transaction });
    }
}
exports.SqliteTransactionRepository = SqliteTransactionRepository;
