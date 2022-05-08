"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = void 0;
const faker_1 = require("@faker-js/faker");
const _1 = require(".");
const repositories_1 = require("../../repositories");
const NoErrorThrownError_1 = require("../../helpers/NoErrorThrownError");
exports.email = faker_1.faker.internet.email();
describe("Create User", () => {
    it("Should successfully create a user", async () => {
        const name = faker_1.faker.name.findName();
        const data = {
            email: exports.email,
            name,
        };
        await _1.createUserUseCase.execute(data);
        const user = await repositories_1.sqliteUserRepository.findByEmail(exports.email);
        expect(user).not.toBeNull();
        expect(user).not.toBeUndefined();
        expect(user.email).toBe(exports.email);
        expect(user.name).toBe(name);
    });
    it("Should fail to register a user with same email", async () => {
        const name = faker_1.faker.name.findName();
        const data = {
            email: exports.email,
            name,
        };
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.createUserUseCase.execute(data));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("Já existe um usuário cadastrado com este email");
    });
    it("Should fail to register a user with invalid email", async () => {
        const email = "invalidemail";
        const name = faker_1.faker.name.findName();
        const data = {
            email,
            name,
        };
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.createUserUseCase.execute(data));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("O Email recebido é inválido");
    });
});
