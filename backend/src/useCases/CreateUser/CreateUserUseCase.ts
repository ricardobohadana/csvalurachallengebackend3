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

    if (userAlreadyExists) throw new Error("Este usuário já existe.");

    const user = new User(data);

    await this.usersRepository.save({
      ...user,
      password: hashSync(user.password, 10),
    });

    await this.mailTriggerProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      from: {
        email: "cacolorde@gmail.com",
        name: "Equipe de cadastro de transações",
      },
      subject: "Cadastro realizado com sucesso! Abra para ver sua senha.",
      message: `<p>Esta é sua senha: <strong>${user.password}</strong></p>`,
    });
  }
}
