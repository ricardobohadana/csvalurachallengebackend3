import { User } from "@prisma/client";
import internal from "stream";

interface ReducedUser {
  id: string;
  name: string;
  email: string;
}

class TransactionGroup {
  public user: ReducedUser;
  public dataCadastro: Date;
  public numDeTransacoes: number;

  constructor(props: TransactionGroup) {
    Object.assign(this, props);
  }
}

export { TransactionGroup };
