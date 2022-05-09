interface ReducedUser {
  id: string;
  name: string;
  email: string;
}

class TransactionGroup {
  public user: ReducedUser;
  public dataCadastro: Date;
  public numDeTransacoes: number;
  public dataTransacoes: Date;

  constructor(props: TransactionGroup) {
    Object.assign(this, props);
  }
}

export { TransactionGroup };
