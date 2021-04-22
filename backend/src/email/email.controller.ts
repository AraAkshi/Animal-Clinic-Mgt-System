import { Controller, Get, Res, Body, Post } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailservice: EmailService) {}

  @Post('sendmail')
  async sendmail(
    @Body()
    data: {
      email: string;
      name: string;
      password: string;
      url: string;
    },
  ) {
    try {
      return await this.emailservice.sendUserConfirmation(
        data.email,
        data.name,
        data.password,
        data.url,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Cron('0 4 * * *')
  async notifyNextTreatment() {
    return await this.emailservice.sendTreatmentReminder();
  }

  @Cron('0 5 * * *')
  async notifyDueAppointments() {
    return await this.emailservice.sendAppointmentReminder();
  }
}
