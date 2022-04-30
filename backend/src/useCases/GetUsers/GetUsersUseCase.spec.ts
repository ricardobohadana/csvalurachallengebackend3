import { getUsersUseCase } from ".";

describe("pass", () => {
  it("should return an array of transaction groups", async () => {
    const users = await getUsersUseCase.execute();
    const filteredUsers = users.filter((u) => u.show === 1);

    expect(users.length).toBeGreaterThan(0);
    expect(users.length).toBe(filteredUsers.length);
  });
});
