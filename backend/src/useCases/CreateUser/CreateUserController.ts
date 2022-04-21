import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email } = request.body;

      if (!email || !name) throw new Error("Nome ou Email não informados");

      await this.createUserUseCase.execute({ name, email });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Erro inesperado.",
      });
    }
  }
}
