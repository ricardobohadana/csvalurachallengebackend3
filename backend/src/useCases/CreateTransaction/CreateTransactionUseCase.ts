import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";
import { ICreateTransactionRequestDTO } from "./ICreateTransactionDTO";

export class CreateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: ICreateTransactionRequestDTO[]) {
    // checando se a transação possui todos os valores não vazios ou não definidos
    const isValid = data.map((obj) =>
      Object.values(obj).every((val) => val !== "" || val !== undefined)
    );

    if (!isValid.every((val) => val === true))
      throw new Error(`A transação tem valores faltando.`);

    const transactions = data.map((transfer) => {
      return new Transaction(transfer);
    });

    await this.transactionRepository.saveList(transactions);
  }
}
