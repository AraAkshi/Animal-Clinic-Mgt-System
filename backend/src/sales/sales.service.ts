import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesEntity } from 'src/entities/sales.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name);
  constructor(
    @InjectRepository(SalesEntity)
    private repo: Repository<SalesEntity>,
  ) {}

  //Get all Items
  async getAllRecords(): Promise<SalesEntity[]> {
    this.logger.log('Start getting details for sales Items');
    const res = await getRepository(SalesEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.category', 'category')
      .getMany();
    return res;
  }

  //Get records of the same Category
  //@params - category
  async getCatItems(category: any): Promise<SalesEntity[]> {
    this.logger.log(`Start getting details of Items of Category - ${category}`);
    const res = await getRepository(SalesEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.category', 'category')
      .where('tbl.category.id = :id')
      .setParameter('id', category)
      .getMany();
    this.logger.log(
      `Successfully returned details of Items of Category - ${category}`,
    );
    return res;
  }

  //Add New Record
  async addItem(data: {
    name: string;
    category: any;
    soldQty: number;
    amount: number;
  }): Promise<SalesEntity> {
    Object.assign(data, { soldDate: new Date() });
    const res = this.repo.create(data);
    await this.repo.save(res);
    this.logger.log(`Successfully Added Item - ${data.name}`);
    return res;
  }

  //Edit Existing record Data
  //@params - Item id and to edit data
  async editItem(data: {
    name?: string;
    category?: any;
    soldQty?: number;
    amount?: number;
    soldDate?: Date;
    id: number;
  }): Promise<SalesEntity> {
    const res = await this.repo.findOne(data.id);
    const { name, category, soldQty, soldDate, amount } = data;

    if (name) res.name = name;
    if (category) res.category = category;
    if (soldQty) res.soldQty = soldQty;
    if (amount) res.amount = amount;
    if (soldDate) res.soldDate = soldDate;

    await this.repo.save(res);
    this.logger.log(`Successfully Updated details of Item - ${res.name}`);
    return res;
  }

  //Delete record
  //@params - Item id
  async deleteItem(data: { id: number }) {
    await getRepository(SalesEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted Item with Id - ${data.id}`);
  }
}
