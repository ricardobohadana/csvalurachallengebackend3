import { User } from "../entities/User";
import { MinimumUser } from "../useCases/AuthorizeUser/AuthorizeUserUseCase";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
  getAll(): Promise<Array<User>>;
  delete(userId: string): Promise<void>;
  update(user: MinimumUser);
  getById(userId: string): Promise<User>;
  _getById(userId: string): Promise<User>;
}
