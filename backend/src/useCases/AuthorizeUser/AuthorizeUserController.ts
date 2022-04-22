import e, { NextFunction, Request, Response } from "express";
import { AuthorizeUserUseCase } from "./AuthorizeUserUseCase";

export class AuthorizeUserController {
  constructor(private authorizeUserUseCase: AuthorizeUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next?: NextFunction
  ): Promise<Response> {
    try {
      // check if headers are present
      const authorizationHeader = request.headers.authorization as string;

      if (!authorizationHeader)
        throw new Error("Cabeçalho de autorização não encontrado.");

      const decodedUser = await this.authorizeUserUseCase.execute({
        authorizationHeader,
      });

      if (next) {
        // colocando o user dentro do body
        request.body.user = decodedUser;
        next();
      } else {
        return response.status(200).json({ user: decodedUser });
      }
    } catch (err) {
      return response.status(401).json({ message: err.message });
    }
  }
}
