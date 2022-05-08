"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }
    async handle(request, response) {
        //
        try {
            const id = request.params.userId;
            const { email, name } = request.body;
            if (!email || !name)
                throw new Error("Os dados para atualização não foram recebidos.");
            await this.updateUserUseCase.execute({ id, email, name });
            return response.status(202).json({
                user: {
                    email,
                    name,
                },
            });
        }
        catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
}
exports.UpdateUserController = UpdateUserController;
