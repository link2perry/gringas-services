var MailImpl = /** @class */ (function () {
    function MailImpl(mail) {
        this.from = "";
        this.to = "";
        this.subject = "";
        this.text = "";
        this.html = "";
        if (mail) {
            this.from = mail.from;
            this.to = mail.to;
            this.subject = mail.subject;
            this.text = mail.text;
            this.html = mail.html;
        }
    }
    return MailImpl;
}());
export default MailImpl;
//# sourceMappingURL=../../src/src/model/MailImpl.js.map