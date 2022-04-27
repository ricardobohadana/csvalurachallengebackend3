import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUpdateUserDTO } from "./IUpdateUserDTO";

class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUpdateUserDTO) {
    if (data.email === "" || data.name === "")
      throw new Error(
        "Não é possível atualizar um usuário para um campo vazio."
      );

    // impedindo que o admin seja atualizado
    if (data.id === "9a0d0a7f-695b-4231-81cb-d30f3b65ad05")
      throw new Error("Este usuário não pode ser atualizado.");

    await this.usersRepository.update(data);
  }
}

export { UpdateUserUseCase };
