"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("pass", () => {
    it("should return an array of transaction groups", async () => {
        const transactions = await _1.getTransactionsUseCase.execute({
            dataTransacao: new Date("2022-01-01T22:30:00"),
        });
        expect(transactions.length).toBeGreaterThan(0);
    });
});
