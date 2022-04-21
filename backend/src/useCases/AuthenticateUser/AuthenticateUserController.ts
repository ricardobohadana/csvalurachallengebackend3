import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      if (!email || !password) throw new Error("Email ou senha não informados");

      const token = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.status(200).json({
        accessToken: token,
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Erro inesperado",
      });
    }
  }
}
