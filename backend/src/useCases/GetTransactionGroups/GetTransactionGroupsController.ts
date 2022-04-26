import { Request, Response } from "express";
import { GetTransactionGroupsUseCase } from "./GetTransactionGroupsUseCase";

class GetTransactionGroupsController {
  constructor(
    private getTransactionGroupsUseCase: GetTransactionGroupsUseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const data = await this.getTransactionGroupsUseCase.execute();
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

export { GetTransactionGroupsController };
