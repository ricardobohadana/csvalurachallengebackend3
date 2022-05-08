"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersController = void 0;
class GetUsersController {
    constructor(getUsersUseCase) {
        this.getUsersUseCase = getUsersUseCase;
    }
    async handle(request, response) {
        try {
            const users = await this.getUsersUseCase.execute();
            return response.status(200).json({ users: users });
        }
        catch (ex) {
            console.log(ex);
            return response.status(400).json(JSON.parse(ex));
        }
    }
}
exports.GetUsersController = GetUsersController;
