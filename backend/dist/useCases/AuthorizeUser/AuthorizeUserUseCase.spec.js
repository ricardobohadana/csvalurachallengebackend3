"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const NoErrorThrownError_1 = require("../../helpers/NoErrorThrownError");
const AuthenticateUser_1 = require("../AuthenticateUser");
describe("Authorization", () => {
    it("Should return correct user when verifying token", async () => {
        const [token, user] = await AuthenticateUser_1.authenticateUserUseCase.execute({
            email: "admin@email.com.br",
            password: "123999",
        });
        const userAuth = await _1.authorizeUserUseCase.execute({
            authorizationHeader: `Bearer ${token}`,
        });
        expect(user.email).toBe(userAuth.email);
        expect(user.id).toBe(userAuth.id);
        expect(user.name).toBe(userAuth.name);
    });
    it("Should throw error when invalid token is received", async () => {
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.authorizeUserUseCase.execute({
            authorizationHeader: `Bearer ${"faketoken"}`,
        }));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("Web token inválido ou expirado");
    });
});
