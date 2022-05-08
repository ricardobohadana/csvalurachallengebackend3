"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async handle(request, response) {
        try {
            // checking if user exists in request:
            const user = request.body.user;
            const deleteUserId = request.params.userId;
            if (!user)
                throw new Error("Não há objeto usuário na requisição");
            if (!deleteUserId)
                throw new Error("Não há id de remoção na requisição");
            await this.deleteUserUseCase.execute({
                userId: deleteUserId,
                user: user,
            });
            return response.sendStatus(202);
        }
        catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }
}
exports.DeleteUserController = DeleteUserController;
