import { User } from "@prisma/client";
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

  constructor(props: Omit<Transaction, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
