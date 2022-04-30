// https://losikov.medium.com/part-4-node-js-express-typescript-unit-tests-with-jest-5204414bf6f0

import { verify } from "jsonwebtoken";
import { authenticateUserUseCase } from ".";
import { SECRET } from "../../app";
import { getError, NoErrorThrownError } from "../../helpers/NoErrorThrownError";
import { EncodedUser } from "../AuthorizeUser/AuthorizeUserUseCase";

describe("Authentication", () => {
  it("Should return valid user credentials and token when attempting to log in with registered admin credentials", async () => {
    const credentials = {
      email: "admin@email.com.br",
      password: "123999",
    };
    const [token, user] = await authenticateUserUseCase.execute(credentials);
    expect(user.email).toBe(credentials.email);
    expect(user.show).toBe(0);
    //testing token
    expect(token).not.toBeNull();
    expect(token).not.toBeUndefined();
    const decoded = verify(token, SECRET) as EncodedUser;
    expect(decoded.email).toBe(user.email);
    expect(decoded.name).toBe(user.name);
  });

  it("Shoud throw error if user email is not registered", async () => {
    const error = await getError<Error>(
      async () =>
        await authenticateUserUseCase.execute({
          email: "fakeEmail@email.com",
          password: "fakepassword",
        })
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe("Email não cadastrado no banco de dados");
  });

  it("Shoud throw error if password is incorrect", async () => {
    const error = await getError<Error>(
      async () =>
        await authenticateUserUseCase.execute({
          email: "admin@email.com.br",
          password: "fakepassword",
        })
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe("Senha incorreta");
  });
});
