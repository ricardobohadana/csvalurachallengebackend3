"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatch = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
const salt = (0, bcrypt_1.genSaltSync)(10);
function hashPassword(password) {
    return (0, bcrypt_1.hashSync)(password, salt);
}
exports.hashPassword = hashPassword;
function isMatch(password, encrypted) {
    return (0, bcrypt_1.compareSync)(password, encrypted);
}
exports.isMatch = isMatch;
