import { ITransactionRepository } from "../../repositories/ITransactionRepository";

class GetTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute() {
    return await this.transactionRepository.getAll();
  }
}

export { GetTransactionsUseCase };
