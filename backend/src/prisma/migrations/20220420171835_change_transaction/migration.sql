/*
  Warnings:

  - You are about to drop the column `groupId` on the `Transaction` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bancoOrigem" TEXT NOT NULL,
    "agenciaOrigem" TEXT NOT NULL,
    "contaOrigem" TEXT NOT NULL,
    "bancoDestino" TEXT NOT NULL,
    "agenciaDestino" TEXT NOT NULL,
    "contaDestino" TEXT NOT NULL,
    "valorTransacao" TEXT NOT NULL,
    "dataTransacao" DATETIME NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("agenciaDestino", "agenciaOrigem", "bancoDestino", "bancoOrigem", "contaDestino", "contaOrigem", "dataTransacao", "id", "userId", "valorTransacao") SELECT "agenciaDestino", "agenciaOrigem", "bancoDestino", "bancoOrigem", "contaDestino", "contaOrigem", "dataTransacao", "id", "userId", "valorTransacao" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
