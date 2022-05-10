import { IMailProvider, IMessage } from "../IMailProvider";
import { connect } from "node-mailjet";

export class MailJetMailProvider implements IMailProvider {
  constructor(private emailApiKey: string, private emailSecretKey: string) {}

  async sendMail(message: IMessage): Promise<void> {
    const mailjet = connect(this.emailApiKey, this.emailSecretKey);
    const request = mailjet.post("send", { version: "v3.1" }).request({
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
