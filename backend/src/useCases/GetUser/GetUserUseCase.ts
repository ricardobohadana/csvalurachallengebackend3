import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class GetUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    return await this.usersRepository.getById(id);
  }
}

export { GetUserUseCase };
