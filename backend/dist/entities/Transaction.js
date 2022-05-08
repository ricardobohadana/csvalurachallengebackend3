"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const uuid_1 = require("uuid");
class Transaction {
    constructor(props, dataCadastro, id) {
        Object.assign(this, props);
        this.dataCadastro = dataCadastro;
        if (!id) {
            this.id = (0, uuid_1.v4)();
        }
    }
}
exports.Transaction = Transaction;
