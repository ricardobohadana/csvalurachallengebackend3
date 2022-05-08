"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const User_1 = require("../../entities/User");
class CreateUserUseCase {
    constructor(usersRepository, mailTriggerProvider) {
        this.usersRepository = usersRepository;
        this.mailTriggerProvider = mailTriggerProvider;
    }
    async execute(data) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        if (!(data.email.includes("@") && data.email.includes(".")))
            throw new Error("O Email recebido é inválido");
        if (userAlreadyExists)
            throw new Error("Já existe um usuário cadastrado com este email");
        const user = new User_1.User(data);
        // cadastrando o admin
        // if (user.name === "Admin" && user.email === "admin@email.com.br") {
        //   user.password = "123999";
        // }
        await this.usersRepository.save(Object.assign(Object.assign({}, user), { password: (0, bcrypt_1.hashSync)(user.password, 10) }));
        await this.mailTriggerProvider.sendMail({
            to: {
                email: user.email,
                name: user.name,
            },
            from: {
                email: "cacolorde@gmail.com",
                name: "Equipe da Análise de Transações",
            },
            subject: "Cadastro realizado com sucesso! Abra para ver sua senha.",
            message: `<p>Esta é sua senha: <strong>${user.password}</strong></p>`,
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
