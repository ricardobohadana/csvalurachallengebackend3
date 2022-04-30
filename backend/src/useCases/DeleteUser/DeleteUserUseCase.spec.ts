import faker from "@faker-js/faker";
import { deleteUserUseCase } from ".";
import { User } from "../../entities/User";
import { getError, NoErrorThrownError } from "../../helpers/NoErrorThrownError";
import { sqliteUserRepository } from "../../repositories";
import { email } from "../CreateUser/CreateUserUseCase.spec";

const testUser = {
  id: "23e96352-ec19-4c14-9835-c1cdaa0c5740",
  name: "ricardo",
  email: "ricardobm@gmail.com",
  //   password: "$2b$10$4qxdeIbzDMm0WnG1PY6CVurHdm1rVd0rC7p.LcfvORhA61X96c4Yi",
  //   show: 1,
};

describe("Delete User", () => {
  it("should delete user successfully", async () => {
    const user = await sqliteUserRepository.findByEmail(email);

    await deleteUserUseCase.execute({ userId: user.id, user: testUser });

    const deletedUser = await sqliteUserRepository._getById(user.id);

    expect(deletedUser.show).toBe(0);
  });

  it("should fail to delete own user", async () => {
    const error = await getError<Error>(
      async () =>
        await deleteUserUseCase.execute({ userId: testUser.id, user: testUser })
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe("Você não pode excluir o próprio usuário");
  });
});
