"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionsUseCase = void 0;
class GetTransactionsUseCase {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async execute({ dataTransacao }) {
        return await this.transactionRepository.getByDate(dataTransacao);
    }
}
exports.GetTransactionsUseCase = GetTransactionsUseCase;
