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
      const authorizationHeader = request.headers.Authorization as string;

      if (!authorizationHeader)
        throw new Error("Cabeçalho de autorização não encontrado.");

      const encodedUser = await this.authorizeUserUseCase.execute({
        authorizationHeader,
      });
      // colocando o user dentro do body
      request.body.user = encodedUser;
      if (next) {
        next();
      } else {
        return response.sendStatus(200);
      }
    } catch (err) {
      return response.status(401).json({ message: err.message });
    }
  }
}
