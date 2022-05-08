"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoErrorThrownError = exports.getError = void 0;
class NoErrorThrownError extends Error {
}
exports.NoErrorThrownError = NoErrorThrownError;
const getError = async (call) => {
    try {
        await call();
        throw new NoErrorThrownError();
    }
    catch (error) {
        return error;
    }
};
exports.getError = getError;
