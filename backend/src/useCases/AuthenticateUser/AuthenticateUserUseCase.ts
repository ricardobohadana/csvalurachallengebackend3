import { sign } from "jsonwebtoken";
import { SECRET } from "../../app";
import { User } from "../../entities/User";
import { isMatch } from "../../helpers/hash";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IAuthenticateUserDTO } from "./IAuthenticateUserDTO";

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IAuthenticateUserDTO): Promise<[string, User]> {
    // console.log("here");

    // find by user by email
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) throw new Error("Email não cadastrado no banco de dados");
    const { password, transactions, ...encodedUsr } = user;

    const pwdMatch = isMatch(data.password, user.password);

    if (!pwdMatch) throw new Error("Senha incorreta");

    // gerando um token para o usuário
    const token = sign(encodedUsr, SECRET, {
      expiresIn: "10m",
    });

    return [token, user];
  }
}
