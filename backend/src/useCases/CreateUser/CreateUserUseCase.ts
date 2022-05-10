import { hashSync } from "bcrypt";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./ICreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailTriggerProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (!(data.email.includes("@") && data.email.includes(".")))
      throw new Error("O Email recebido é inválido");

    if (userAlreadyExists)
      throw new Error("Já existe um usuário cadastrado com este email");

    const user = new User(data);

    // cadastrando o admin
    if (user.name === "Admin" && user.email === "admin@email.com.br") {
      user.password = "123999";
    }

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

    await this.usersRepository.save({
      ...user,
      password: hashSync(user.password, 10),
    });
  }
}
