"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteUserRepository = void 0;
class SqliteUserRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async _getById(userId) {
        return await this.prismaClient.user.findFirst({
            where: {
                id: userId,
            },
        });
    }
    async getById(userId) {
        return await this.prismaClient.user.findFirst({
            where: {
                id: userId,
                show: 1,
            },
        });
    }
    async checkExistance(id) {
        const count = await this.prismaClient.user.count({ where: { id: id } });
        return count > 0;
    }
    async update(user) {
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
        }
        else {
            throw new Error("Não há usuário cadastrado com esse id");
        }
    }
    async delete(userId) {
        // old delete
        if (false) {
            if (this.checkExistance(userId)) {
                await this.prismaClient.user.delete({
                    where: {
                        id: userId,
                    },
                });
            }
            else {
                throw new Error("Não há usuário cadastrado com esse id");
            }
        }
        else {
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
    async getAll() {
        return await this.prismaClient.user.findMany({
            where: {
                show: 1,
            },
        });
    }
    async findByEmail(email) {
        return await this.prismaClient.user.findFirst({
            where: {
                email: email,
                // show: 1,
            },
        });
    }
    async save(user) {
        await this.prismaClient.user.create({ data: user });
    }
}
exports.SqliteUserRepository = SqliteUserRepository;
