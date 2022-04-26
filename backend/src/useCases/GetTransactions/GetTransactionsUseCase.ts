import { ITransactionRepository } from "../../repositories/ITransactionRepository";
import { IGetTransactionsDTO } from "./IGetTransactionsDTO";

class GetTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute({ userId, dataCadastro }: IGetTransactionsDTO) {
    return await this.transactionRepository.getByUserIdAndDate(
      userId,
      dataCadastro
    );
  }
}

export { GetTransactionsUseCase };
