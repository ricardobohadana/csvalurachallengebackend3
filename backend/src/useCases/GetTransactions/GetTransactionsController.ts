import { Request, Response } from "express";
import { GetTransactionsUseCase } from "./GetTransactionsUseCase";

class GetTransactionsController {
  constructor(private getTransactionsUseCase: GetTransactionsUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { userId, dataCadastro } = request.query;

      if (!userId || !dataCadastro)
        return response.status(400).json({
          message:
            "Não foram enviados os parâmtros necessários (userId e dataCadastro)",
        });

      const data = await this.getTransactionsUseCase.execute({
        userId: userId as string,
        dataCadastro: new Date(dataCadastro as string),
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
