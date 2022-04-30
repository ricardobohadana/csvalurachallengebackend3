import { PrismaClient } from "@prisma/client";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IDeleteUserDTO } from "./IDeleteUserDTO";

class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IDeleteUserDTO) {
    //
    if (data.userId === data.user.id)
      throw new Error("Você não pode excluir o próprio usuário");

    await this.usersRepository.delete(data.userId);
  }
}

export { DeleteUserUseCase };
