import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/entities/appointment.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger(AppointmentService.name);
  constructor(
    @InjectRepository(AppointmentEntity)
    private repo: Repository<AppointmentEntity>,
  ) {}

  //Get all Appointments
  async getAllAppointments(): Promise<AppointmentEntity[]> {
    this.logger.log('Start getting details for all Appointments');
    const res = await this.repo.find();
    this.logger.log('Successfully returned All Appointments');
    return res;
  }

  //Get One Appointment
  //@params - Appointment Id
  async getOneAppointment(AppId: number): Promise<AppointmentEntity> {
    this.logger.log(`Start getting details for Appointment with Id - ${AppId}`);
    const res = await this.repo.findOne(AppId);
    this.logger.log(
      `Successfully returned details for Appointment with Id - ${AppId}`,
    );
    return res;
  }

  //Add New Appointment
  async addAppointment(data: {
    remarks: string;
    scheduleDateTime: Date;
    animal: any;
    customer: any;
  }): Promise<AppointmentEntity> {
    Object.assign(data, { addedDate: new Date() });
    const res = this.repo.create(data);
    await this.repo.save(res);
    this.logger.log(
      `Successfully Added Appointment - ${res.customer} on ${res.scheduleDateTime}`,
    );
    return res;
  }

  //Edit Existing Appointment Data
  //@params - Appointment id and to edit description
  async editAppointment(data: {
    isAttended?: boolean;
    remarks?: string;
    scheduleDateTime?: Date;
    animal?: any;
    customer?: any;
    id: number;
  }): Promise<AppointmentEntity> {
    const res = await this.repo.findOne(data.id);
    const { scheduleDateTime, animal, customer, remarks, isAttended } = data;

    if (scheduleDateTime) res.scheduleDateTime = scheduleDateTime;
    if (animal) res.animal = animal;
    if (customer) res.customer = customer;
    if (remarks) res.remarks = remarks;
    if (isAttended) res.isAttended = isAttended;

    await this.repo.save(res);
    this.logger.log(`Successfully Updated details of Appointment - ${res.id}`);
    return res;
  }

  //Delete Appointment
  //@params - Appointment id
  async deleteAppointments(data: { id: number }) {
    await getRepository(AppointmentEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted Appointment with Id - ${data.id}`);
  }

  //Get Appointments of a Customer
  //@params - Appointment Id
  async getCusAppointment(customer: any): Promise<AppointmentEntity[]> {
    this.logger.log(
      `Start getting details of Appointment of customer - ${customer}`,
    );
    const res = await this.repo.find({ where: { customer: customer } });
    this.logger.log(
      `Successfully returned details of Appointment of customer - ${customer}`,
    );
    return res;
  }
}
