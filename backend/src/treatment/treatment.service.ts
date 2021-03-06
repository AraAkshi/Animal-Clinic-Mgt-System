import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentEntity } from 'src/entities/treatment.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class TreatmentService {
  private readonly logger = new Logger(TreatmentService.name);
  constructor(
    @InjectRepository(TreatmentEntity)
    private repo: Repository<TreatmentEntity>,
  ) {}

  //Get all Treatments
  async getAllTreatments(): Promise<TreatmentEntity[]> {
    this.logger.log('Start getting details for all Treatments');
    const res = await getRepository(TreatmentEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.customer', 'customer')
      .leftJoinAndSelect('tbl.animal', 'animal')
      .getMany();
    this.logger.log('Successfully returned All Treatments');
    return res;
  }

  //Get One Treatment
  //@params - Treatment Id
  async getOneTreatment(id: number): Promise<TreatmentEntity> {
    this.logger.log(`Start getting details for Treatment with Id - ${id}`);
    const res = await getRepository(TreatmentEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.customer', 'customer')
      .leftJoinAndSelect('tbl.animal', 'animal')
      .where('tbl.id = :id')
      .setParameter('id', id)
      .getOne();
    this.logger.log(
      `Successfully returned details for Treatment with Id - ${id}`,
    );
    return res;
  }

  //Get Treatments of the a Customer
  //@params - category
  async getCusTreatments(customer: any): Promise<TreatmentEntity[]> {
    this.logger.log(
      `Start getting details of Treatments of customer - ${customer}`,
    );
    const res = await getRepository(TreatmentEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.customer', 'customer')
      .leftJoinAndSelect('tbl.animal', 'animal')
      .where('tbl.customer.id = :id')
      .setParameter('id', customer)
      .getMany();
    this.logger.log(
      `Successfully returned details of Treatments of customer - ${customer}`,
    );
    return res;
  }

  //Get Treatments of the same Category
  //@params - category
  async getAnimlTreatments(animal: any): Promise<TreatmentEntity[]> {
    this.logger.log(
      `Start getting details of Treatments of animal - ${animal}`,
    );
    const res = await getRepository(TreatmentEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.customer', 'customer')
      .leftJoinAndSelect('tbl.animal', 'animal')
      .where('tbl.animal.id = :id')
      .setParameter('id', animal)
      .getMany();
    this.logger.log(
      `Successfully returned details of Treatments of animal - ${animal}`,
    );
    return res;
  }

  //Get treatments by Day

  //Add New Treatment
  async addTreatment(data: {
    treatmentType: string;
    customer: any;
    animal: any;
    itemsUsed: any;
    description: string;
    dateReceived: Date;
    timeReceived: string;
    nextTreatmentDate: Date;
  }): Promise<TreatmentEntity> {
    const res = this.repo.create(data);
    await this.repo.save(res);
    this.logger.log(`Successfully Added Treatment - ${res.id}`);
    return res;
  }

  //Edit Existing Treatment Data
  //@params - Treatment id and to edit data
  async editTreatment(data: {
    treatmentType?: string;
    customer?: any;
    animal?: any;
    itemsUsed?: any;
    description?: string;
    dateReceived?: Date;
    timeReceived?: string;
    nextTreatmentDate?: Date;
    id: number;
  }): Promise<TreatmentEntity> {
    const res = await this.repo.findOne(data.id);
    const {
      treatmentType,
      customer,
      animal,
      itemsUsed,
      description,
      dateReceived,
      timeReceived,
      nextTreatmentDate,
    } = data;

    if (treatmentType) res.treatmentType = treatmentType;
    if (customer) res.customer = customer;
    if (animal) res.animal = animal;
    if (itemsUsed) res.itemsUsed = itemsUsed;
    if (description) res.description = description;
    if (dateReceived) res.dateReceived = dateReceived;
    if (timeReceived) res.timeReceived = timeReceived;
    if (nextTreatmentDate) res.nextTreatmentDate = nextTreatmentDate;

    await this.repo.save(res);
    this.logger.log(`Successfully Updated details of Treatment - ${res.id}`);
    return res;
  }

  //Delete Treatment
  //@params - Treatment id
  async deleteTreatment(data: { id: number }) {
    await getRepository(TreatmentEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted Treatment with Id - ${data.id}`);
  }
}
