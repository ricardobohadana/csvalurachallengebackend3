import { v4 } from "uuid";
import { Transaction } from "./Transaction";

export class User {
  //
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public show: number;
  // public transactions: Transaction[];

  constructor(
    props: Omit<User, "id" | "password" | "show">,
    id?: string,
    password?: string,
    show?: string
  ) {
    Object.assign(this, props);

    if (!id) this.id = v4();

    if (!password) this.password = Math.random().toString().substring(2, 8);

    if (!show) this.show = 1;
  }
}
