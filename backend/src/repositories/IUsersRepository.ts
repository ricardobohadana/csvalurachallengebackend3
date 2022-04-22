import { User } from "../entities/User";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
  getAll(): Promise<Array<User>>;
}
