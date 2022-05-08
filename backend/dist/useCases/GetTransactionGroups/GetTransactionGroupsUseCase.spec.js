"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("pass", () => {
    it("should return an array of transaction groups", async () => {
        const transactions = await _1.getTransactionGroupsUseCase.execute();
        expect(transactions.length).toBeGreaterThan(0);
    });
});
