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
exports.AuthenticateUserUseCase = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const app_1 = require("../../app");
const hash_1 = require("../../helpers/hash");
class AuthenticateUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(data) {
        // console.log("here");
        // find by user by email
        const user = await this.usersRepository.findByEmail(data.email);
        if (!user) {
            throw new Error("Email não cadastrado no banco de dados");
        }
        const { password } = user, encodedUsr = __rest(user, ["password"]);
        const pwdMatch = (0, hash_1.isMatch)(data.password, user.password);
        if (!pwdMatch)
            throw new Error("Senha incorreta");
        // gerando um token para o usuário
        const token = (0, jsonwebtoken_1.sign)(encodedUsr, app_1.SECRET, {
            expiresIn: "10m",
        });
        return [token, user];
    }
}
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
