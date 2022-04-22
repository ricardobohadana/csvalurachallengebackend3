import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";
import { MinimumUser } from "../../useCases/AuthorizeUser/AuthorizeUserUseCase";
import { IUsersRepository } from "../IUsersRepository";

export class SqliteUserRepository implements IUsersRepository {
  constructor(private prismaClient: PrismaClient) {}

  async checkExistance(id: string) {
    const count = await this.prismaClient.user.count({ where: { id: id } });
    return count > 0;
  }

  async update(user: MinimumUser) {
    const { id, name, email } = user;
    if (this.checkExistance(id)) {
      await this.prismaClient.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
        },
      });
    } else {
      throw new Error("Não há usuário cadastrado com esse id");
    }
  }

  async delete(userId: string): Promise<void> {
    if (this.checkExistance(userId)) {
      await this.prismaClient.user.delete({
        where: {
          id: userId,
        },
      });
    } else {
      throw new Error("Não há usuário cadastrado com esse id");
    }
  }

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
