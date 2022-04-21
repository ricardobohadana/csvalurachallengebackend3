-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");
