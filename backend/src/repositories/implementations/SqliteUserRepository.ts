import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";
import { MinimumUser } from "../../useCases/AuthorizeUser/AuthorizeUserUseCase";
import { IUsersRepository } from "../IUsersRepository";

export class SqliteUserRepository implements IUsersRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getById(userId: string): Promise<User> {
    return await this.prismaClient.user.findFirst({
      where: {
        id: userId,
        show: 1,
      },
    });
  }

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
    // old delete
    if (false) {
      if (this.checkExistance(userId)) {
        await this.prismaClient.user.delete({
          where: {
            id: userId,
          },
        });
      } else {
        throw new Error("Não há usuário cadastrado com esse id");
      }
    } else {
      await this.prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          show: 0,
        },
      });
    }
  }

  async getAll(): Promise<User[]> {
    return await this.prismaClient.user.findMany({
      where: {
        show: 1,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaClient.user.findFirst({
      where: {
        email: email,
        show: 1,
      },
    });
  }

  async save(user: User): Promise<void> {
    await this.prismaClient.user.create({ data: user });
  }
}
