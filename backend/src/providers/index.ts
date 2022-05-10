import { EMAIL_API_KEY, EMAIL_SECRET_KEY } from "../app";
import { MailJetMailProvider } from "./implementations/MailJetMailProvider";
import { MailTrapMailProvider } from "./implementations/MailTrapMailProvider";

const mailTrapMailProvider = new MailTrapMailProvider();

const mailJetMailProvider = new MailJetMailProvider(
  EMAIL_API_KEY,
  EMAIL_SECRET_KEY
);

export { mailTrapMailProvider, mailJetMailProvider };
