import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";
import { ICreateTransactionRequestDTO } from "./ICreateTransactionRequestDTO";

export class CreateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: ICreateTransactionRequestDTO[]) {
    if (data.length === 0)
      throw new Error("Não foram encontradas transações válidas");

    // pegando a primeira data válida para comparação
    let minDate = data[0].dataTransacao;
    let i = 1;
    while (minDate === undefined || null || "") {
      minDate = data[i].dataTransacao;
      i++;
      if (i === data.length) throw new Error("Não há datas válidas");
    }

    // limpando os dados por valores faltantes, indefinidos, "" ou com data diferente da primeira transação
    const filteredData = data.filter(
      (obj) =>
        Object.values(obj).every(
          (val) => val !== "" && val !== undefined && val !== null
        ) &&
        obj.dataTransacao.getFullYear() === minDate.getFullYear() &&
        obj.dataTransacao.getMonth() === minDate.getMonth() &&
        obj.dataTransacao.getDate() === minDate.getDate()
    );
    const isValid = filteredData.every(
      (obj) =>
        Object.values(obj).every((val) => val !== "" || val !== undefined) &&
        obj.dataTransacao.getFullYear() === minDate.getFullYear() &&
        obj.dataTransacao.getMonth() === minDate.getMonth() &&
        obj.dataTransacao.getDate() === minDate.getDate()
    );

    // checando se a transação possui todos os valores não vazios ou não definidos
    if (!isValid)
      throw new Error(`Ocorreu um erro no salvamento das transações`);
    if (filteredData.length === 0)
      throw new Error(
        "Após limpar o arquivo, não sobraram valores para serem salvos"
      );

    const dataCadastro = new Date();
    const transactions = filteredData.map((transfer) => {
      return new Transaction(transfer, dataCadastro);
    });

    // checa se já foi enviado um arquivo de transação para esta data
    const dbGroup =
      await this.transactionRepository.selectGroupedTransactions();

    const isSameDate = dbGroup.some(
      (v) =>
        v.dataTransacoes.getFullYear() === minDate.getFullYear() &&
        v.dataTransacoes.getMonth() === minDate.getMonth() &&
        v.dataTransacoes.getDate() === minDate.getDate()
    );

    if (isSameDate)
      throw new Error("Já foi enviado um arquivo de transações para esta data");

    await this.transactionRepository.saveList(transactions);

    return { transactions: transactions.length, date: minDate };
  }
}
