import { ITransactionRepository } from "../../repositories/ITransactionRepository";

class GetTransactionGroupsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute() {
    return await this.transactionRepository.selectGroupedTransactions();
  }
}

export { GetTransactionGroupsUseCase };
