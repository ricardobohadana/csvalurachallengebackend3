"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionsController = void 0;
class GetTransactionsController {
    constructor(getTransactionsUseCase) {
        this.getTransactionsUseCase = getTransactionsUseCase;
    }
    async handle(request, response) {
        try {
            const { dataTransacao } = request.query;
            if (!dataTransacao)
                return response.status(400).json({
                    message: "Não foi enviado o parâmtro necessário (dataTransacao)",
                });
            const data = await this.getTransactionsUseCase.execute({
                dataTransacao: new Date(dataTransacao),
            });
            if (!data) {
                return response
                    .status(204)
                    .json({ message: "Não há transações cadastradas" });
            }
            return response.status(200).json({ data });
        }
        catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
}
exports.GetTransactionsController = GetTransactionsController;
