import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class SqliteUserRepository implements IUsersRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getAll(): Promise<User[]> {
    return await this.prismaClient.user.findMany();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async save(user: User): Promise<void> {
    await this.prismaClient.user.create({ data: user });
  }
}
