import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";

export class MailTrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "dfc708e3d9b55c",
        pass: "ff68f30586da7f",
      },
    });
  }

  async sendMail(mail: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: mail.to.name,
        address: mail.to.email,
      },
      from: {
        name: mail.to.name,
        address: mail.to.email,
      },
      subject: mail.subject,
      html: mail.message,
    });
  }
}
