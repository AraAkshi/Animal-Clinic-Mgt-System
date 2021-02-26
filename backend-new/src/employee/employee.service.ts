import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/entities/employee.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);
  constructor(
    @InjectRepository(EmployeeEntity)
    private repo: Repository<EmployeeEntity>,
  ) {}

  //Get all Employees
  async getAllEmployees(): Promise<EmployeeEntity[]> {
    this.logger.log('Start getting details for all Employees');
    const res = await this.repo.find();
    this.logger.log('Successfully returned All Employees');
    return res;
  }

  //Get One Employee
  //@params - Employee Id
  async getOneEmployee(empID: number): Promise<EmployeeEntity> {
    this.logger.log(`Start getting details for Employee with Id - ${empID}`);
    const res = await this.repo.findOne(empID);
    this.logger.log(
      `Successfully returned details for Employee with Id - ${empID}`,
    );
    return res;
  }

  //Add New Employee
  async addEmployee(data: {
    nic: string;
    name: string;
    email: string;
    address: string;
    designation: string;
    epfNo: number;
    contact: number;
  }): Promise<EmployeeEntity> {
    const res = this.repo.create(data);
    await this.repo.save(res);
    this.logger.log(`Successfully Added Employee - ${data.name}`);
    return res;
  }

  //Edit Existing Employee Data
  //@params - Employee id and to edit data
  async editEmployee(data: {
    isActive?: boolean;
    nic?: string;
    name?: string;
    email?: string;
    address?: string;
    designation?: string;
    epfNo?: number;
    contact?: number;
    id: number;
  }): Promise<EmployeeEntity> {
    const res = await this.repo.findOne(data.id);
    const {
      nic,
      name,
      email,
      address,
      contact,
      epfNo,
      designation,
      isActive,
    } = data;

    if (name) res.name = name;
    if (email) res.email = email;
    if (contact) res.contact = contact;
    if (epfNo) res.epfNo = epfNo;
    if (designation) res.designation = designation;
    if (address) res.address = address;
    if (nic) res.nic = nic;
    if (isActive) res.isActive = isActive;

    await this.repo.save(res);
    this.logger.log(`Successfully Updated details of Employee - ${res.name}`);
    return res;
  }

  //Delete Employee
  //@params - Employee id
  async deleteEmployees(data: { id: number }) {
    await getRepository(EmployeeEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted Employee with Id - ${data.id}`);
  }
}
