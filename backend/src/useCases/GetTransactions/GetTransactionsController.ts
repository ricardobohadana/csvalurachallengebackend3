import { Request, Response } from "express";
import { GetTransactionsUseCase } from "./GetTransactionGroupsUseCase";

class GetTransactionsController {
  constructor(private getTransactionsUseCase: GetTransactionsUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const data = await this.getTransactionsUseCase.execute();
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
