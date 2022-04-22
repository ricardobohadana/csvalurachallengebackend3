import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      // checking if user exists in request:
      const user = request.body.user;
      const deleteUserId = request.params.userId;
      if (!user) throw new Error("Não há objeto usuário na requisição");
      if (!deleteUserId) throw new Error("Não há id de remoção na requisição");

      await this.deleteUserUseCase.execute({
        userId: deleteUserId,
        user: user,
      });
      return response.status(202);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export { DeleteUserController };
