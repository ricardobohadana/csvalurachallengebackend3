"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
class UpdateUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(data) {
        if (data.email === "" || data.name === "")
            throw new Error("Não é possível atualizar um usuário para um campo vazio");
        const newEmailUser = await this.usersRepository.findByEmail(data.email);
        if (newEmailUser !== null && newEmailUser.id !== data.id)
            throw new Error("O email inserido já está em uso");
        // impedindo que o admin seja atualizado
        if (data.id === "9a0d0a7f-695b-4231-81cb-d30f3b65ad05")
            throw new Error("Este usuário não pode ser atualizado");
        await this.usersRepository.update(data);
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;
