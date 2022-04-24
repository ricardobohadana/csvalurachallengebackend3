import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUserUseCase";

class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(request: Request, response: Response) {
    const userId = request.params.userId;
    try {
      if (!userId)
        throw new Error(
          "É necessário enviar um id para retornar um único usuário"
        );

      const { password, id, ...user } = await this.getUserUseCase.execute(
        userId
      );

      return response.status(200).json({ user: user });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { GetUserController };
