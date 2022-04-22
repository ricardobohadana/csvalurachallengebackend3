import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUpdateUserDTO } from "./IUpdateUserDTO";

class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUpdateUserDTO) {
    if (data.email === "" || data.name === "")
      throw new Error(
        "Não é possível atualizar um usuário para um campo vazio."
      );
    await this.usersRepository.update(data);
  }
}

export { UpdateUserUseCase };
