import Mail from "./Mail";

export default class MailImpl implements Mail {
  from: string = "";
  to: string = "";
  subject: string = "";
  text: string = "";
  html: string = "";

  constructor(mail?: Mail) {
    if(mail) {
      this.from = mail.from;
      this.to = mail.to;
      this.subject = mail.subject;
      this.text = mail.text;
      this.html = mail.html;
    }
  }
}