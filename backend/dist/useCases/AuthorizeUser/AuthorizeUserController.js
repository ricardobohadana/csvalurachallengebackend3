"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeUserController = void 0;
class AuthorizeUserController {
    constructor(authorizeUserUseCase) {
        this.authorizeUserUseCase = authorizeUserUseCase;
    }
    async handle(request, response, next) {
        try {
            // check if headers are present
            const authorizationHeader = request.headers.authorization;
            if (!authorizationHeader)
                throw new Error("Cabeçalho de autorização não encontrado.");
            const decodedUser = await this.authorizeUserUseCase.execute({
                authorizationHeader,
            });
            if (next) {
                // colocando o user dentro do body
                request.body.user = decodedUser;
                next();
            }
            else {
                return response.status(200).json({ user: decodedUser });
            }
        }
        catch (err) {
            return response.status(401).json({ message: err.message });
        }
    }
}
exports.AuthorizeUserController = AuthorizeUserController;
