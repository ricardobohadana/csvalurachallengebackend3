"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserUseCase = void 0;
class GetUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(id) {
        const user = await this.usersRepository.getById(id);
        if (!user)
            throw new Error("Não há usuários cadastrados com esse id");
        return user;
    }
}
exports.GetUserUseCase = GetUserUseCase;
