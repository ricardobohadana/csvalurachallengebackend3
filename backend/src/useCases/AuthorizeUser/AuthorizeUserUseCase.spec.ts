import { authorizeUserUseCase } from ".";
import {
  getError,
  NoErrorThrownError,
} from "../../__tests__/NoErrorThrownError";
import { authenticateUserUseCase } from "../AuthenticateUser";

describe("Authorization", () => {
  it("Should return correct user when verifying token", async () => {
    const [token, user] = await authenticateUserUseCase.execute({
      email: "admin@email.com.br",
      password: "123999",
    });

    const userAuth = await authorizeUserUseCase.execute({
      authorizationHeader: `Bearer ${token}`,
    });

    expect(user.email).toBe(userAuth.email);
    expect(user.id).toBe(userAuth.id);
    expect(user.name).toBe(userAuth.name);
  });

  it("Should throw error when invalid token is received", async () => {
    const error = await getError<Error>(
      async () =>
        await authorizeUserUseCase.execute({
          authorizationHeader: `Bearer ${"faketoken"}`,
        })
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error.message).toBe("Web token inválido ou expirado");
  });
});
