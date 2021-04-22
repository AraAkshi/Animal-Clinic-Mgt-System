import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TreatmentModule } from 'src/treatment/treatment.module';
import { CustomerModule } from 'src/customer/customer.module';
import { AppointmentModule } from 'src/appointment/appointment.module';

@Module({
  imports: [TreatmentModule, CustomerModule, AppointmentModule],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
