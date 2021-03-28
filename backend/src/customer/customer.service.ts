import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/entities/customer.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);
  constructor(
    @InjectRepository(CustomerEntity)
    private repo: Repository<CustomerEntity>,
  ) {}

  //Get all Customers
  async getAllCustomers(): Promise<CustomerEntity[]> {
    this.logger.log('Start getting details for all Customers');
    const res = await this.repo.find();
    this.logger.log('Successfully returned All Customers');
    return res;
  }

  //Get One Customer
  //@params - Customer Id
  async getOneCustomer(id: number): Promise<CustomerEntity> {
    this.logger.log(`Start getting details for Customer with Id - ${id}`);
    const res = await this.repo.findOne(id);
    this.logger.log(
      `Successfully returned details for Customer with Id - ${id}`,
    );
    return res;
  }

  //Get One Customer by email
  //@params - Customer email
  async getCusByEmail(email: string): Promise<CustomerEntity> {
    this.logger.log(`Start getting details for Customer with email - ${email}`);
    const res = await this.repo.findOne({ where: { email: email } });
    this.logger.log(
      `Successfully returned details for Customer with email - ${email}`,
    );
    return res;
  }

  //Add New Customer
  async addCustomer(data: {
    name: string;
    email: string;
    address: string;
    contact: number;
    remarks: string;
  }): Promise<CustomerEntity> {
    Object.assign(data, { enteredDate: new Date() });
    const res = this.repo.create(data);
    await this.repo.save(res);
    this.logger.log(`Successfully Added Customer - ${data.name}`);
    return res;
  }

  //Edit Existing Customer Data
  //@params - Customer id and to edit data
  async editCustomer(data: {
    isActive?: boolean;
    name?: string;
    email?: string;
    address?: string;
    contact?: number;
    remarks?: string;
    animal?: any;
    treatments?: any;
    appointments?: any;
    id: number;
  }): Promise<CustomerEntity> {
    const res = await this.repo.findOne(data.id);
    const {
      name,
      email,
      address,
      contact,
      isActive,
      remarks,
      animal,
      treatments,
      appointments,
    } = data;

    if (name) res.name = name;
    if (email) res.email = email;
    if (contact) res.contact = contact;
    if (address) res.address = address;
    if (isActive) res.isActive = isActive;
    if (remarks) res.remarks = remarks;
    if (animal) res.animal = animal;
    if (treatments) res.treatments = treatments;
    if (appointments) res.appointments = appointments;

    await this.repo.save(res);
    this.logger.log(`Successfully Updated details of Customer - ${res.name}`);
    return res;
  }

  //Delete Customer
  //@params - Customer id
  async deleteCustomers(data: { id: number }) {
    await getRepository(CustomerEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted Customer with Id - ${data.id}`);
  }
}
