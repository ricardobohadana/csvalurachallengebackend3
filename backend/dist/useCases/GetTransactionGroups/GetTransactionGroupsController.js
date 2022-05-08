"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionGroupsController = void 0;
class GetTransactionGroupsController {
    constructor(getTransactionGroupsUseCase) {
        this.getTransactionGroupsUseCase = getTransactionGroupsUseCase;
    }
    async handle(request, response) {
        try {
            const data = await this.getTransactionGroupsUseCase.execute();
            console.log(data);
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
exports.GetTransactionGroupsController = GetTransactionGroupsController;
