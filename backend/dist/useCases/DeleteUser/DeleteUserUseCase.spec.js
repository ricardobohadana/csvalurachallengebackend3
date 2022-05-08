"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const NoErrorThrownError_1 = require("../../helpers/NoErrorThrownError");
const repositories_1 = require("../../repositories");
const CreateUserUseCase_spec_1 = require("../CreateUser/CreateUserUseCase.spec");
const testUser = {
    id: "23e96352-ec19-4c14-9835-c1cdaa0c5740",
    name: "ricardo",
    email: "ricardobm@gmail.com",
    //   password: "$2b$10$4qxdeIbzDMm0WnG1PY6CVurHdm1rVd0rC7p.LcfvORhA61X96c4Yi",
    //   show: 1,
};
describe("Delete User", () => {
    it("should delete user successfully", async () => {
        const user = await repositories_1.sqliteUserRepository.findByEmail(CreateUserUseCase_spec_1.email);
        await _1.deleteUserUseCase.execute({ userId: user.id, user: testUser });
        const deletedUser = await repositories_1.sqliteUserRepository._getById(user.id);
        expect(deletedUser.show).toBe(0);
    });
    it("should fail to delete own user", async () => {
        const error = await (0, NoErrorThrownError_1.getError)(async () => await _1.deleteUserUseCase.execute({ userId: testUser.id, user: testUser }));
        expect(error).not.toBeInstanceOf(NoErrorThrownError_1.NoErrorThrownError);
        expect(error.message).toBe("Você não pode excluir o próprio usuário");
    });
});
