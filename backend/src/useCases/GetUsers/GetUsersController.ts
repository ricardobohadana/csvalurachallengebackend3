import { Request, Response } from "express";
import { GetUsersUseCase } from "./GetUsersUseCase";

class GetUsersController {
  constructor(private getUsersUseCase: GetUsersUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const users = await this.getUsersUseCase.execute();

      return response.status(200).json({ users: users });
    } catch (ex) {
      console.log(ex);
      return response.status(400).json(JSON.parse(ex));
    }
  }
}

export { GetUsersController };
