import { getTransactionGroupsUseCase } from ".";

describe("pass", () => {
  it("should return an array of transaction groups", async () => {
    const transactions = await getTransactionGroupsUseCase.execute();
    expect(transactions.length).toBeGreaterThan(0);
  });
});
