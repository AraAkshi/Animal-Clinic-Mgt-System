import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetTypeEntity } from 'src/entities/petType.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class PetTypeService {
  private readonly logger = new Logger(PetTypeService.name);
  constructor(
    @InjectRepository(PetTypeEntity)
    private repo: Repository<PetTypeEntity>,
  ) {}

  //Get all PetTypes
  async getAllPetTypes(): Promise<PetTypeEntity[]> {
    this.logger.log('Start getting details for all Pet Types');
    const res = await this.repo.find();
    this.logger.log('Successfully returned All Pet Types');
    return res;
  }

  //Get One Type
  //@params - Type Id
  async getOneType(id: number): Promise<PetTypeEntity> {
    this.logger.log(`Start getting details for Type with Id - ${id}`);
    const res = await this.repo.findOne(id);
    this.logger.log(`Successfully returned details for Type with Id - ${id}`);
    return res;
  }

  //Add New Type
  async addType(data: { name: string }): Promise<PetTypeEntity> {
    const res = this.repo.create(data);
    await this.repo.save(res);
    this.logger.log(`Successfully Added Type - ${data.name}`);
    return res;
  }

  //Edit Existing Type Data
  //@params - Type id and to edit data
  async editType(data: { name?: string; id: number }): Promise<PetTypeEntity> {
    const res = await this.repo.findOne(data.id);
    const { name } = data;

    if (name) res.name = name;

    await this.repo.save(res);
    this.logger.log(`Successfully Updated details of Type - ${res.name}`);
    return res;
  }

  //Delete Type
  //@params - Type id
  async deleteType(data: { id: number }) {
    await getRepository(PetTypeEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted Type with Id - ${data.id}`);
  }
}
