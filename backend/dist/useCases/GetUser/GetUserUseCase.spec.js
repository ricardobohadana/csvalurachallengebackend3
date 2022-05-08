"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const NoErrorThrownError_1 = require("../../helpers/NoErrorThrownError");
const repositories_1 = require("../../repositories");
describe("pass", () => {
    it("should return an array of transaction groups", async () => {
        const users = await repositories_1.sqliteUserRepository.getAll();
        const user = await _1.getUserUseCase.execute(users[0].id);
        expect(user.id).toBe(users[0].id);
        expect(user).not.toBeNull();
        expect(user).not.toBeUndefined();
    });
    it("should fail to return a previously deleted user", async () => {
        const id = "9a0d0a7f-695b-4231-81cb-d30f3b65ad05";
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.getUserUseCase.execute(id));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("Não há usuários cadastrados com esse id");
    });
});
