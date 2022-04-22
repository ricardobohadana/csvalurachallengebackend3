import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class GetUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<User[]> {
    return await this.usersRepository.getAll();
  }
}

export { GetUsersUseCase };
