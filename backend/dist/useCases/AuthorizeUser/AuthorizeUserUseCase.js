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
exports.AuthorizeUserUseCase = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const app_1 = require("../../app");
class AuthorizeUserUseCase {
    constructor() { }
    async execute(data) {
        const [, accessToken] = data.authorizationHeader.split(" ");
        if (!accessToken)
            throw new Error("Token de acesso não encontrado. Certifique-se que ele está sendo enviado como um parâmetro 'Authorization' dentro do 'header' da requisição.");
        var decodedUser;
        (0, jsonwebtoken_1.verify)(accessToken, app_1.SECRET, (err, decoded) => {
            if (err)
                throw new Error("Web token inválido ou expirado");
            decodedUser = decoded;
        });
        const { iat, exp } = decodedUser, user = __rest(decodedUser, ["iat", "exp"]);
        return user;
    }
}
exports.AuthorizeUserUseCase = AuthorizeUserUseCase;
