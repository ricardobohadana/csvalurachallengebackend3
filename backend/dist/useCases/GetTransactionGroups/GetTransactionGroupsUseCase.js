"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionGroupsUseCase = void 0;
class GetTransactionGroupsUseCase {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async execute() {
        return await this.transactionRepository.selectGroupedTransactions();
    }
}
exports.GetTransactionGroupsUseCase = GetTransactionGroupsUseCase;
