import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppointmentEntity } from 'src/entities/appointment.entity';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private service: AppointmentService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<AppointmentEntity[]> {
    return await this.service.getAllAppointments();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<AppointmentEntity> {
    return await this.service.getOneAppointment(data.id);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      remarks: string;
      scheduleDate: Date;
      scheduleTime: string;
      animal: any;
      customer: any;
    },
  ): Promise<AppointmentEntity> {
    return await this.service.addAppointment(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      isAttended?: boolean;
      remarks?: string;
      scheduleDate?: Date;
      scheduleTime?: string;
      animal?: any;
      customer?: any;
      id: number;
    },
  ): Promise<AppointmentEntity> {
    return await this.service.editAppointment(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteAppointments(data);
  }

  @Post('/getCustomerApp')
  // @UseGuards(JwtAuthGuard)
  async getCustomerApp(
    @Body() data: { customer: any },
  ): Promise<AppointmentEntity[]> {
    return await this.service.getCusAppointment(data.customer);
  }
}
