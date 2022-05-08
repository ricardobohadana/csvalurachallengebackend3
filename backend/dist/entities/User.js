"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    // public transactions: Transaction[];
    constructor(props, id, password, show) {
        Object.assign(this, props);
        if (!id)
            this.id = (0, uuid_1.v4)();
        if (!password)
            this.password = Math.random().toString().substring(2, 8);
        if (!show)
            this.show = 1;
    }
}
exports.User = User;
