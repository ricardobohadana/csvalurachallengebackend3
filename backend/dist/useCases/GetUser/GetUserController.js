"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserController = void 0;
class GetUserController {
    constructor(getUserUseCase) {
        this.getUserUseCase = getUserUseCase;
    }
    async handle(request, response) {
        const userId = request.params.userId;
        try {
            if (!userId)
                throw new Error("É necessário enviar um id para retornar um único usuário");
            const _a = await this.getUserUseCase.execute(userId), { password, id } = _a, user = __rest(_a, ["password", "id"]);
            return response.status(200).json({ user: user });
        }
        catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
}
exports.GetUserController = GetUserController;
