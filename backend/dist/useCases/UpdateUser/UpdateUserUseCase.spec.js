"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("@faker-js/faker"));
const _1 = require(".");
const NoErrorThrownError_1 = require("../../helpers/NoErrorThrownError");
const repositories_1 = require("../../repositories");
describe("pass", () => {
    it("should update a user accordingly", async () => {
        const fakeName = faker_1.default.name.findName();
        const fakeEmail = faker_1.default.internet.email();
        const users = await repositories_1.sqliteUserRepository.getAll();
        const user = users[0];
        user.name = fakeName;
        user.email = fakeEmail;
        // update user
        await _1.updateUserUseCase.execute(user);
        // verify that user was updated
        const newUser = await repositories_1.sqliteUserRepository.getById(user.id);
        expect(newUser.email).toBe(fakeEmail);
        expect(newUser.name).toBe(fakeName);
    });
    it("should fail to update a user with already registered email", async () => {
        const fakeName = faker_1.default.name.findName();
        const users = await repositories_1.sqliteUserRepository.getAll();
        const user = users[0];
        user.name = fakeName;
        user.email = "ricardobm@gmail.com";
        // update user
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.updateUserUseCase.execute(user));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("O email inserido já está em uso");
    });
    it("should fail to update a user with empty email", async () => {
        const fakeName = faker_1.default.name.findName();
        const users = await repositories_1.sqliteUserRepository.getAll();
        const user = users[0];
        user.name = fakeName;
        user.email = "";
        // update user
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.updateUserUseCase.execute(user));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("Não é possível atualizar um usuário para um campo vazio");
    });
    it("should fail to update a user with empty name", async () => {
        const fakeEmail = faker_1.default.internet.email();
        const users = await repositories_1.sqliteUserRepository.getAll();
        const user = users[0];
        user.name = "";
        user.email = fakeEmail;
        // update user
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.updateUserUseCase.execute(user));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("Não é possível atualizar um usuário para um campo vazio");
    });
    it("should fail to update admin user", async () => {
        const fakeEmail = faker_1.default.internet.email();
        const fakeName = faker_1.default.name.findName();
        const user = await repositories_1.sqliteUserRepository.findByEmail("admin@email.com.br");
        user.name = fakeName;
        user.email = fakeEmail;
        // update user
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.updateUserUseCase.execute(user));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("Este usuário não pode ser atualizado");
    });
});
