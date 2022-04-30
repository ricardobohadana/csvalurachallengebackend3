import { notDeepEqual } from "assert";
import { getUserUseCase } from ".";
import { getError, NoErrorThrownError } from "../../helpers/NoErrorThrownError";
import { sqliteUserRepository } from "../../repositories";

describe("pass", () => {
  it("should return an array of transaction groups", async () => {
    const users = await sqliteUserRepository.getAll();
    const user = await getUserUseCase.execute(users[0].id);

    expect(user.id).toBe(users[0].id);
    expect(user).not.toBeNull();
    expect(user).not.toBeUndefined();
  });

  it("should fail to return a previously deleted user", async () => {
    const id = "9a0d0a7f-695b-4231-81cb-d30f3b65ad05";
    const error = await getError<Error>(
      async () => await getUserUseCase.execute(id)
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe("Não há usuários cadastrados com esse id");
  });
});
