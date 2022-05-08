import { IMailProvider, IMessage } from "../IMailProvider";
import { connect, Email } from "node-mailjet";

export class MailJetMailProvider implements IMailProvider {
  private mailjet: Email.Client;

  constructor(private emailApiKey: string, private emailSecretKey: string) {}

  async sendMail(message: IMessage): Promise<void> {
    this.mailjet = connect(this.emailApiKey, this.emailSecretKey);
    const request = this.mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "cacolorde@gmail.com",
            Name: message.from.name,
          },
          To: [
            {
              Email: message.to.email,
              Name: message.to.name,
            },
          ],
          Subject: message.subject,
          TextPart: "Seja bem vindo ao site Análise de Transações!",
          HTMLPart: message.message,
          CustomID: "JustRegisteredEmail",
        },
      ],
    });

    request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  }
}
