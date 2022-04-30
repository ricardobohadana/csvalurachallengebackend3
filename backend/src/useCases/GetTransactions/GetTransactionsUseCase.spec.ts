import { getTransactionsUseCase } from ".";

describe("pass", () => {
  it("should return an array of transaction groups", async () => {
    const transactions = await getTransactionsUseCase.execute({
      dataTransacao: new Date("2022-01-01T22:30:00"),
    });
    expect(transactions.length).toBeGreaterThan(0);
  });
});
