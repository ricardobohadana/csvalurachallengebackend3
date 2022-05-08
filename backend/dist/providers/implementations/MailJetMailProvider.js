"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailJetMailProvider = void 0;
const node_mailjet_1 = require("node-mailjet");
class MailJetMailProvider {
    constructor(emailApiKey, emailSecretKey) {
        this.emailApiKey = emailApiKey;
        this.emailSecretKey = emailSecretKey;
    }
    async sendMail(message) {
        this.mailjet = (0, node_mailjet_1.connect)(this.emailApiKey, this.emailSecretKey);
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
exports.MailJetMailProvider = MailJetMailProvider;
