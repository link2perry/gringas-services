import Mail from '../model/Mail';
const nodemailer = require('nodemailer');

const send = async (mail: Mail) => {


  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount((cb: any) => {
  //   console.log('cb: ', cb);
  // });
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'link2perry@gmail.com',
          pass: 'rit12k1t2'
      }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(mail);

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default {
  send: send
};