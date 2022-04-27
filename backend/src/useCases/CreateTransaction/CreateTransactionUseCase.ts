import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";
import { ICreateTransactionRequestDTO } from "./ICreateTransactionDTO";

export class CreateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: ICreateTransactionRequestDTO[]) {
    // pegando a primeira data válida para comparação
    let minData = data[0].dataTransacao;
    let i = 1;
    while (minData === undefined || null || "") {
      minData = data[i].dataTransacao;
      i++;
      if (i === data.length) throw new Error("Não há datas válidas");
    }

    // limpando os dados por valores faltantes, indefinidos, "" ou com data diferente da primeira transação
    const filteredData = data.filter(
      (obj) =>
        Object.values(obj).every((val) => val !== "" || val !== undefined) &&
        obj.dataTransacao.getFullYear() === minData.getFullYear() &&
        obj.dataTransacao.getMonth() === minData.getMonth() &&
        obj.dataTransacao.getDate() === minData.getDate()
    );
    const isValid = filteredData.every(
      (obj) =>
        Object.values(obj).every((val) => val !== "" || val !== undefined) &&
        obj.dataTransacao.getFullYear() === minData.getFullYear() &&
        obj.dataTransacao.getMonth() === minData.getMonth() &&
        obj.dataTransacao.getDate() === minData.getDate()
    );

    // checando se a transação possui todos os valores não vazios ou não definidos
    if (!isValid)
      throw new Error(`Ocorreu um erro no salvamento das transações.`);
    if (filteredData.length === 0)
      throw new Error(
        "Após limpar o arquivo, não sobraram valores para serem salvos."
      );

    const dataCadastro = new Date();
    const transactions = data.map((transfer) => {
      return new Transaction(transfer, dataCadastro);
    });

    // checa se já foi enviado um arquivo de transação para esta data
    const dbGroup =
      await this.transactionRepository.selectGroupedTransactions();

    const isSameDate = dbGroup.some(
      (v) =>
        v.dataTransacoes.getFullYear() === minData.getFullYear() &&
        v.dataTransacoes.getMonth() === minData.getMonth() &&
        v.dataTransacoes.getDate() === minData.getDate()
    );

    if (isSameDate)
      throw new Error(
        "Já foi enviado um arquivo de transações para esta data."
      );

    await this.transactionRepository.saveList(transactions);
  }
}
