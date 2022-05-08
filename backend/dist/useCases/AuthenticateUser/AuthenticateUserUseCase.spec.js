"use strict";
// https://losikov.medium.com/part-4-node-js-express-typescript-unit-tests-with-jest-5204414bf6f0
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const _1 = require(".");
const app_1 = require("../../app");
const NoErrorThrownError_1 = require("../../helpers/NoErrorThrownError");
describe("Authentication", () => {
    it("Should return valid user credentials and token when attempting to log in with registered admin credentials", async () => {
        const credentials = {
            email: "admin@email.com.br",
            password: "123999",
        };
        const [token, user] = await _1.authenticateUserUseCase.execute(credentials);
        expect(user.email).toBe(credentials.email);
        expect(user.show).toBe(0);
        //testing token
        expect(token).not.toBeNull();
        expect(token).not.toBeUndefined();
        const decoded = (0, jsonwebtoken_1.verify)(token, app_1.SECRET);
        expect(decoded.email).toBe(user.email);
        expect(decoded.name).toBe(user.name);
    });
    it("Shoud throw error if user email is not registered", async () => {
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.authenticateUserUseCase.execute({
            email: "fakeEmail@email.com",
            password: "fakepassword",
        }));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("Email não cadastrado no banco de dados");
    });
    it("Shoud throw error if password is incorrect", async () => {
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.authenticateUserUseCase.execute({
            email: "admin@email.com.br",
            password: "fakepassword",
        }));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("Senha incorreta");
    });
});
