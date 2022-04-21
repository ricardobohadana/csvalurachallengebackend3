import { config } from "dotenv";
import { verify } from "jsonwebtoken";
import { SECRET } from "../../app";
import { IAuthorizeUserDTO } from "./IAuthorizeUserDTO";

export interface EncodedUser {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export class AuthorizeUserUseCase {
  constructor() {}

  async execute(data: IAuthorizeUserDTO): Promise<EncodedUser> {
    const [, accessToken] = data.authorizationHeader.split(" ");
    if (!accessToken)
      throw new Error(
        "Token de acesso não encontrado. Certifique-se que ele está sendo enviado como um parâmetro 'Authorization' dentro do 'header' da requisição."
      );

    var decodedUser: EncodedUser;

    verify(accessToken, SECRET, (err, decoded: EncodedUser) => {
      if (err) throw new Error("Web token inválido ou expirado");
      decodedUser = decoded;
    });

    return decodedUser;
  }
}
