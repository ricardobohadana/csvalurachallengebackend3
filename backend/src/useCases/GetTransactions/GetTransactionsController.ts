import { Request, Response } from "express";
import { GetTransactionsUseCase } from "./GetTransactionsUseCase";

class GetTransactionsController {
  constructor(private getTransactionsUseCase: GetTransactionsUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { dataTransacao } = request.query;

      if (!dataTransacao)
        return response.status(400).json({
          message: "Não foi enviado o parâmtro necessário (dataTransacao)",
        });

      const data = await this.getTransactionsUseCase.execute({
        dataTransacao: new Date(dataTransacao as string),
      });

      if (!data) {
        return response
          .status(204)
          .json({ message: "Não há transações cadastradas" });
      }

      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { GetTransactionsController };
