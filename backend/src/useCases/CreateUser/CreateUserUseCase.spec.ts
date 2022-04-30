import { faker } from "@faker-js/faker";
import { createUserUseCase } from ".";
import { sqliteUserRepository } from "../../repositories";
import { getError, NoErrorThrownError } from "../../helpers/NoErrorThrownError";
import { ICreateUserRequestDTO } from "./ICreateUserDTO";

export const email = faker.internet.email();

describe("Create User", () => {
  it("Should successfully create a user", async () => {
    const name = faker.name.findName();
    const data = {
      email,
      name,
    } as ICreateUserRequestDTO;

    await createUserUseCase.execute(data);

    const user = await sqliteUserRepository.findByEmail(email);

    expect(user).not.toBeNull();
    expect(user).not.toBeUndefined();
    expect(user.email).toBe(email);
    expect(user.name).toBe(name);
  });

  it("Should fail to register a user with same email", async () => {
    const name = faker.name.findName();
    const data = {
      email,
      name,
    } as ICreateUserRequestDTO;

    const error = await getError<Error>(
      async () => await createUserUseCase.execute(data)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe(
      "Já existe um usuário cadastrado com este email"
    );
  });

  it("Should fail to register a user with invalid email", async () => {
    const email = "invalidemail";
    const name = faker.name.findName();
    const data = {
      email,
      name,
    } as ICreateUserRequestDTO;

    const error = await getError<Error>(
      async () => await createUserUseCase.execute(data)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe("O Email recebido é inválido");
  });
});
