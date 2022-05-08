"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
class AuthenticateUserController {
    constructor(authenticateUserUseCase) {
        this.authenticateUserUseCase = authenticateUserUseCase;
    }
    async handle(request, response) {
        try {
            const { email, password } = request.body;
            if (!email || !password)
                throw new Error("Email ou senha não informados");
            const [token, user] = await this.authenticateUserUseCase.execute({
                email,
                password,
            });
            return response.status(200).json({
                accessToken: token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            });
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || "Erro inesperado",
            });
        }
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
