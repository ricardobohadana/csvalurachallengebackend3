import internal from "stream";

class TransactionGroup {
  public userName: string;
  public dataCadastro: Date;
  public numOfTransactions: number;

  constructor(props: TransactionGroup) {
    Object.assign(this, props);
  }
}

export { TransactionGroup };
