import { prisma } from "../prisma";
import { SqliteTransactionRepository } from "./implementations/SqliteTransactionRepository";
import { SqliteUserRepository } from "./implementations/SqliteUserRepository";

const sqliteUserRepository = new SqliteUserRepository(prisma);
const sqliteTransactionRepository = new SqliteTransactionRepository(prisma);

export { sqliteTransactionRepository, sqliteUserRepository };
