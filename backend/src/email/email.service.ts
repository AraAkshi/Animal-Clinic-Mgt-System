import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class EmailService {
  // async..await is not allowed in global scope, must use a wrapper
  async sendUserConfirmation(
    email: string,
    name: string,
    password: string,
    url: string,
  ) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'shanenshawnanimalclinic@gmail.com',
        pass: 'Ish@1996',
      },
    });

    let info = await transporter.sendMail({
      from: '"Shane & Shawn Animal Clinic " <noreply@gmail.com>', // sender address
      //to: userdetails.email, // list of receivers
      to: email,
      subject: `Hi ${name}! Welcome to Shane and Shawn Animal CLinic!`, // Subject line
      text: 'Hello world? plain test', // plain text body
      html: `
        <html>
        <head>
        <style>
          border-collapse: collapse;
        </style>
        </head>
        <body style="background-color:whitesmoke">        
          <p>Hey ${name},</p>
          <p>Please login to your user account using the below details</p>
          <p>
          <p>Email: Please use this email to login</p>
          <p>Password: ${password}</p>
          <b>**This is an auto-generated password, please change it by logging into your account</b>
          <a href="${url}">Login to Your Account</a>
          </p>

          <p>Best Regards</p>
          <p>Shane &amp; Shawn Animal Clinic</p>
        </body>
        </html>
        `, // html body
    });
    transporter.close();
    // send mail with defined transport object

    // console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}
