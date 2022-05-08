"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async handle(request, response) {
        try {
            const { name, email } = request.body;
            if (!email || !name)
                throw new Error("Nome ou Email não informados");
            await this.createUserUseCase.execute({ name, email });
            return response.status(201).send();
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || "Erro inesperado.",
            });
        }
    }
}
exports.CreateUserController = CreateUserController;
