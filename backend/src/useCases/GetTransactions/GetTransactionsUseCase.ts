import { ITransactionRepository } from "../../repositories/ITransactionRepository";
import { IGetTransactionsDTO } from "./IGetTransactionsDTO";

class GetTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute({ dataTransacao }: IGetTransactionsDTO) {
    return await this.transactionRepository.getByDate(dataTransacao);
  }
}

export { GetTransactionsUseCase };
