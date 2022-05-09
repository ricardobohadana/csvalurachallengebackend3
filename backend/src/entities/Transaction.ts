import { v4 } from "uuid";

export class Transaction {
  // identificador único da transação
  public readonly id: string;

  // identificador único do usuário que enviou a transação
  public userId: string;

  public bancoOrigem: string;
  public agenciaOrigem: string;
  public contaOrigem: string;
  public bancoDestino: string;
  public agenciaDestino: string;
  public contaDestino: string;
  public valorTransacao: string;
  public dataTransacao: Date;
  public dataCadastro: Date | null;

  constructor(
    props: Omit<Transaction, "id" | "dataCadastro">,
    dataCadastro: Date,
    id?: string
  ) {
    Object.assign(this, props);

    this.dataCadastro = dataCadastro;

    if (!id) {
      this.id = v4();
    }
  }
}
