"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUseCase = void 0;
class DeleteUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(data) {
        //
        if (data.userId === data.user.id)
            throw new Error("Você não pode excluir o próprio usuário");
        await this.usersRepository.delete(data.userId);
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;
