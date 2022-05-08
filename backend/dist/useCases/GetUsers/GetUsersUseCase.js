"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersUseCase = void 0;
class GetUsersUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute() {
        return await this.usersRepository.getAll();
    }
}
exports.GetUsersUseCase = GetUsersUseCase;
