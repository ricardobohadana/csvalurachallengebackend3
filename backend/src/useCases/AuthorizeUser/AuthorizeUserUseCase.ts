import { config } from "dotenv";
import { verify } from "jsonwebtoken";
import { SECRET } from "../../app";
import { User } from "../../entities/User";
import { IAuthorizeUserDTO } from "./IAuthorizeUserDTO";

export interface EncodedUser {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export type MinimumUser = {
  id: string;
  email: string;
  name: string;
};

export class AuthorizeUserUseCase {
  constructor() {}

  async execute(data: IAuthorizeUserDTO): Promise<MinimumUser> {
    const [, accessToken] = data.authorizationHeader.split(" ");
    if (!accessToken)
      throw new Error(
        "Token de acesso não encontrado. Certifique-se que ele está sendo enviado como um parâmetro 'Authorization' dentro do 'header' da requisição."
      );

    var decodedUser;

    verify(accessToken, SECRET, (err, decoded: EncodedUser) => {
      if (err) throw new Error("Web token inválido ou expirado");
      decodedUser = decoded;
    });

    const { iat, exp, ...user } = decodedUser;
    return user;
  }
}
