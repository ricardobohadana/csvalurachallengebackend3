import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class GetUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.getById(id);
    if (!user) throw new Error("Não há usuários cadastrados com esse id");
    return user;
  }
}

export { GetUserUseCase };
