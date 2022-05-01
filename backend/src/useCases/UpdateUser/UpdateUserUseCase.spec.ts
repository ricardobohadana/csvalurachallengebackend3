import faker from "@faker-js/faker";
import { updateUserUseCase } from ".";
import { getError, NoErrorThrownError } from "../../helpers/NoErrorThrownError";
import { sqliteUserRepository } from "../../repositories";

describe("pass", () => {
  it("should update a user accordingly", async () => {
    const fakeName = faker.name.findName();
    const fakeEmail = faker.internet.email();

    const users = await sqliteUserRepository.getAll();
    const user = users[0];
    user.name = fakeName;
    user.email = fakeEmail;

    // update user
    await updateUserUseCase.execute(user);

    // verify that user was updated
    const newUser = await sqliteUserRepository.getById(user.id);

    expect(newUser.email).toBe(fakeEmail);
    expect(newUser.name).toBe(fakeName);
  });

  it("should fail to update a user with already registered email", async () => {
    const fakeName = faker.name.findName();

    const users = await sqliteUserRepository.getAll();
    const user = users[0];
    user.name = fakeName;
    user.email = "ricardobm@gmail.com";

    // update user
    const error = await getError<Error>(
      async () => await updateUserUseCase.execute(user)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe("O email inserido já está em uso");
  });

  it("should fail to update a user with empty email", async () => {
    const fakeName = faker.name.findName();

    const users = await sqliteUserRepository.getAll();
    const user = users[0];
    user.name = fakeName;
    user.email = "";

    // update user
    const error = await getError<Error>(
      async () => await updateUserUseCase.execute(user)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe(
      "Não é possível atualizar um usuário para um campo vazio"
    );
  });

  it("should fail to update a user with empty name", async () => {
    const fakeEmail = faker.internet.email();

    const users = await sqliteUserRepository.getAll();
    const user = users[0];
    user.name = "";
    user.email = fakeEmail;

    // update user
    const error = await getError<Error>(
      async () => await updateUserUseCase.execute(user)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe(
      "Não é possível atualizar um usuário para um campo vazio"
    );
  });

  it("should fail to update admin user", async () => {
    const fakeEmail = faker.internet.email();
    const fakeName = faker.name.findName();

    const user = await sqliteUserRepository.findByEmail("admin@email.com.br");
    user.name = fakeName;
    user.email = fakeEmail;

    // update user
    const error = await getError<Error>(
      async () => await updateUserUseCase.execute(user)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe("Este usuário não pode ser atualizado");
  });
});
