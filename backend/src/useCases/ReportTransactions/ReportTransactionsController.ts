import { Request, response, Response } from "express";
import { ReportTransactionsUseCase } from "./ReportTransactionsUseCase";

class ReportTransactionsController {
  constructor(private reportTransactionsUseCase: ReportTransactionsUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { month, year } = request.query;

      if (!month || !year)
        throw new Error("Você deve especificar um mês e um ano");

      if (Number(month) > 11)
        throw new Error(
          "O valor específicado para o mês de análise deve estar entre 0 e 11"
        );

      const sendData = { month: Number(month), year: Number(year) };
      const data = await this.reportTransactionsUseCase.execute(sendData);

      return response.status(200).json({ ...data });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ message: error.message });

      return response.sendStatus(500);
    }
  }
}

export { ReportTransactionsController };
