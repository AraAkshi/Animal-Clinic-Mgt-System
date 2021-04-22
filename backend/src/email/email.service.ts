import { Injectable, Logger } from '@nestjs/common';
import { AppointmentService } from 'src/appointment/appointment.service';
import { CustomerService } from 'src/customer/customer.service';
import { TreatmentService } from 'src/treatment/treatment.service';
const nodemailer = require('nodemailer');

const today = new Date();

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(
    private treatmentService: TreatmentService,
    private customerService: CustomerService,
    private appointmentService: AppointmentService,
  ) {}
  //Send email when user created by company
  async sendUserConfirmation(
    // async..await is not allowed in global scope, must use a wrapper
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

    this.logger.log(`Start sending user confirmation email to ${email}`);
    let info = await transporter.sendMail({
      from: '"Shane & Shawn Animal Clinic " <noreply@gmail.com>', // sender address
      //to: userdetails.email, // list of receivers
      to: email,
      subject: `Hi ${name}! Welcome to Shane and Shawn Animal Clinic!`, // Subject line
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
    this.logger.log(`Successfully sent user confirmation email to ${email}`);
    // send mail with defined transport object

    // console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  //Send upcoming treatment reminder email
  async sendTreatmentReminder() {
    this.logger.log(`Start checking for upcoming treatments`);
    const allTreats = await this.treatmentService.getAllTreatments();
    if (allTreats !== undefined) {
      for (let index in allTreats) {
        const daysDiff = dateDiff(today, allTreats[index].nextTreatmentDate);
        if (daysDiff <= 2) {
          const customer = await this.customerService.getOneCustomer(
            allTreats[index].customer.id,
          );

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

          this.logger.log(
            `Start sending treatment reminder email to ${customer.email}`,
          );
          let info = await transporter.sendMail({
            from: '"Shane & Shawn Animal Clinic " <noreply@gmail.com>',
            to: customer.email,
            subject: `Upcoming Treatments!`,
            html: `
              <html>
              <head>
              <style>
                border-collapse: collapse;
              </style>
              </head>
              <body style="background-color:whitesmoke">        
                <p>Hey ${customer.name},</p>
                <p>This is a kind reminder of the Upcoming treatment due on: ${formatDate(
                  allTreats[index].nextTreatmentDate,
                )}</p>
                <p>
                <p>Treatment for: ${allTreats[index].animal.name}</p>
                <p>Pet Breed: ${allTreats[index].animal.breed}</p>
                </p>
                <p>Please contact us on 011-2243244 for further inquires</p>

                <p>Best Regards</p>
                <p>Shane &amp; Shawn Animal Clinic</p>
              </body>
              </html>
              `,
          });
          transporter.close();
          this.logger.log(
            `Successfully sent treatment reminder email to ${customer.email}`,
          );
        }
      }
    }
    this.logger.log(`Successfully completed checking for upcoming treatments`);
  }

  //Send upcoming appointment reminder email
  async sendAppointmentReminder() {
    this.logger.log(`Start checking for upcoming appointments`);
    const allApps = await this.appointmentService.getAllAppointments();
    if (allApps !== undefined) {
      for (let index in allApps) {
        const daysDiff = dateDiff(today, allApps[index].scheduleDate);
        if (daysDiff <= 2) {
          const customer = await this.customerService.getOneCustomer(
            allApps[index].customer.id,
          );

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

          this.logger.log(
            `Start sending appointment reminder email to ${customer.email}`,
          );
          let info = await transporter.sendMail({
            from: '"Shane & Shawn Animal Clinic " <noreply@gmail.com>',
            to: customer.email,
            subject: `Upcoming Appointments!`,
            html: `
              <html>
              <head>
              <style>
                border-collapse: collapse;
              </style>
              </head>
              <body style="background-color:whitesmoke">        
                <p>Hey ${customer.name},</p>
                <p>This is a kind reminder of the Upcoming appointment due on: ${formatDate(
                  allApps[index].scheduleDate,
                )}</p>
                <p>
                <h4>Appointment Details</h4>
                <p>Appointment Time: ${allApps[index].scheduleTime}</p>
                <p>Appointment Reason: ${allApps[index].remarks}</p>
                <p>Appointment pet: ${
                  allApps[index].animal ? allApps[index].animal.name : ''
                }</p>
                </p>
                <p>Please contact us on 011-2243244 for further inquires</p>

                <p>Best Regards</p>
                <p>Shane &amp; Shawn Animal Clinic</p>
              </body>
              </html>
              `,
          });
          transporter.close();
          this.logger.log(
            `Successfully sent appointment reminder email to ${customer.email}`,
          );
        }
      }
    }
    this.logger.log(
      `Successfully completed checking for upcoming appointments`,
    );
  }
}

export const dateDiff = (date1: Date, date2: Date) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  // To calculate the time difference of two dates
  let diffInTime = d2.getTime() - d1.getTime();

  // To calculate the no. of days between two dates
  let diffInDays = diffInTime / (1000 * 3600 * 24);
  return diffInDays;
};

export const formatDate = (date: Date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};
