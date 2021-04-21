import { Controller, Get, Res, Body, Post } from '@nestjs/common';
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
}
