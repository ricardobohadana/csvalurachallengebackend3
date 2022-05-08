"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailTrapMailProvider = void 0;
const nodemailer_1 = require("nodemailer");
class MailTrapMailProvider {
    constructor() {
        this.transporter = (0, nodemailer_1.createTransport)({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "dfc708e3d9b55c",
                pass: "ff68f30586da7f",
            },
        });
    }
    async sendMail(mail) {
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
exports.MailTrapMailProvider = MailTrapMailProvider;
