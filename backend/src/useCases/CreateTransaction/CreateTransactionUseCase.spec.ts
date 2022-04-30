import { createTransactionUseCase } from ".";
import { ICreateTransactionRequestDTO } from "./ICreateTransactionDTO";
import { faker } from "@faker-js/faker";
import {
  getError,
  NoErrorThrownError,
} from "../../__tests__/NoErrorThrownError";
faker.setLocale("pt_BR");

const BANKS = [
  "BANCO DO BRASIL",
  "BANCO SANTANDER",
  "BANCO BRADESCO",
  "BANCO INTER",
  "BANCO ITAU",
  "BANCO BANRISUL",
  "CAIXA ECONOMICA FEDERAL",
  "NUBANK",
];

const getBank = () => {
  return BANKS[Math.floor(Math.random() * BANKS.length)];
};

describe("Creating Transactions", () => {
  it("Should create 3 transactions successfully", async () => {
    const dataTransacao = faker.date.recent();

    const transactionsArray = [] as ICreateTransactionRequestDTO[];

    for (let i = 1; i < 4; i++) {
      transactionsArray.push({
        bancoOrigem: getBank(),
        agenciaOrigem: faker.finance.account(4),
        contaOrigem: `${faker.finance.account(4)}-1`,
        bancoDestino: getBank(),
        agenciaDestino: faker.finance.account(4),
        contaDestino: `${faker.finance.account(4)}-1`,
        userId: "9a0d0a7f-695b-4231-81cb-d30f3b65ad05",
        dataTransacao: dataTransacao,
        valorTransacao: faker.finance.amount(1000, 1000000, 0),
      });
    }

    const transfers = await createTransactionUseCase.execute(transactionsArray);
    expect(transfers.transactions).toBe(3);
    expect(transfers.date).toBe(dataTransacao);
  });

  it("should create only 3 transactions of the 4 given because of missing data", async () => {
    const dataTransacao = faker.date.past();

    const transactionsArray = [] as ICreateTransactionRequestDTO[];

    for (let i = 1; i < 4; i++) {
      transactionsArray.push({
        bancoOrigem: getBank(),
        agenciaOrigem: faker.finance.account(4),
        contaOrigem: `${faker.finance.account(4)}-1`,
        bancoDestino: getBank(),
        agenciaDestino: faker.finance.account(4),
        contaDestino: `${faker.finance.account(4)}-1`,
        userId: "9a0d0a7f-695b-4231-81cb-d30f3b65ad05",
        dataTransacao: dataTransacao,
        valorTransacao: faker.finance.amount(1000, 1000000, 0),
      });
    }
    transactionsArray.push({
      bancoOrigem: "",
      agenciaOrigem: faker.finance.account(4),
      contaOrigem: `${faker.finance.account(4)}-1`,
      bancoDestino: getBank(),
      agenciaDestino: faker.finance.account(4),
      contaDestino: `${faker.finance.account(4)}-1`,
      userId: "9a0d0a7f-695b-4231-81cb-d30f3b65ad05",
      dataTransacao: dataTransacao,
      valorTransacao: faker.finance.amount(1000, 1000000, 0),
    });
    const transfers = await createTransactionUseCase.execute(transactionsArray);
    expect(transfers.transactions).toBe(3);
    expect(transfers.date).toBe(dataTransacao);
  });

  it("should create only 3 transactions of the 5 given because of  data and date", async () => {
    const dataTransacao = faker.date.past();

    const transactionsArray = [] as ICreateTransactionRequestDTO[];

    for (let i = 1; i < 4; i++) {
      transactionsArray.push({
        bancoOrigem: getBank(),
        agenciaOrigem: faker.finance.account(4),
        contaOrigem: `${faker.finance.account(4)}-1`,
        bancoDestino: getBank(),
        agenciaDestino: faker.finance.account(4),
        contaDestino: `${faker.finance.account(4)}-1`,
        userId: "9a0d0a7f-695b-4231-81cb-d30f3b65ad05",
        dataTransacao: dataTransacao,
        valorTransacao: faker.finance.amount(1000, 1000000, 0),
      });
    }
    transactionsArray.push({
      bancoOrigem: "",
      agenciaOrigem: faker.finance.account(4),
      contaOrigem: `${faker.finance.account(4)}-1`,
      bancoDestino: getBank(),
      agenciaDestino: faker.finance.account(4),
      contaDestino: `${faker.finance.account(4)}-1`,
      userId: "9a0d0a7f-695b-4231-81cb-d30f3b65ad05",
      dataTransacao: dataTransacao,
      valorTransacao: faker.finance.amount(1000, 1000000, 0),
    });
    const transfers = await createTransactionUseCase.execute(transactionsArray);
    expect(transfers.transactions).toBe(3);
    expect(transfers.date).toBe(dataTransacao);
  });

  it("should fail to create transactions because of empty array after filters", async () => {
    const dataTransacao = faker.date.past();

    const transactionsArray = [] as ICreateTransactionRequestDTO[];

    for (let i = 1; i < 4; i++) {
      transactionsArray.push({
        bancoOrigem: getBank(),
        agenciaOrigem: faker.finance.account(4),
        contaOrigem: `${faker.finance.account(4)}-1`,
        bancoDestino: getBank(),
        agenciaDestino: "",
        contaDestino: `${faker.finance.account(4)}-1`,
        userId: "9a0d0a7f-695b-4231-81cb-d30f3b65ad05",
        dataTransacao: dataTransacao,
        valorTransacao: faker.finance.amount(1000, 1000000, 0),
      });
    }

    const error = await getError<Error>(
      async () => await createTransactionUseCase.execute(transactionsArray)
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe(
      "Após limpar o arquivo, não sobraram valores para serem salvos"
    );
  });

  it("should fail to create transactions with already registered dates", async () => {
    const dataTransacao = new Date("2022-01-01T08:12:00");

    const transactionsArray = [] as ICreateTransactionRequestDTO[];

    for (let i = 1; i < 4; i++) {
      transactionsArray.push({
        bancoOrigem: getBank(),
        agenciaOrigem: faker.finance.account(4),
        contaOrigem: `${faker.finance.account(4)}-1`,
        bancoDestino: getBank(),
        agenciaDestino: faker.finance.account(4),
        contaDestino: `${faker.finance.account(4)}-1`,
        userId: "9a0d0a7f-695b-4231-81cb-d30f3b65ad05",
        dataTransacao: dataTransacao,
        valorTransacao: faker.finance.amount(1000, 1000000, 0),
      });
    }

    const error = await getError<Error>(
      async () => await createTransactionUseCase.execute(transactionsArray)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe(
      "Já foi enviado um arquivo de transações para esta data"
    );
  });

  it("should fail to create transactions because of empty array", async () => {
    const dataTransacao = new Date("2022-01-01T08:12:00");

    const transactionsArray = [] as ICreateTransactionRequestDTO[];

    for (let i = 1; i < 4; i++) {
      transactionsArray.push({
        bancoOrigem: getBank(),
        agenciaOrigem: faker.finance.account(4),
        contaOrigem: `${faker.finance.account(4)}-1`,
        bancoDestino: getBank(),
        agenciaDestino: "",
        contaDestino: `${faker.finance.account(4)}-1`,
        userId: "9a0d0a7f-695b-4231-81cb-d30f3b65ad05",
        dataTransacao: dataTransacao,
        valorTransacao: faker.finance.amount(1000, 1000000, 0),
      });
    }

    const error = await getError<Error>(
      async () => await createTransactionUseCase.execute([])
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe("Não foram encontradas transações válidas");
  });
});
