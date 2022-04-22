import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response) {
    //
    try {
      const id = request.params.userId;
      const { email, name } = request.body;

      if (!email || !name)
        throw new Error("Os dados para atualização não foram recebidos.");

      await this.updateUserUseCase.execute({ id, email, name });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { UpdateUserController };
