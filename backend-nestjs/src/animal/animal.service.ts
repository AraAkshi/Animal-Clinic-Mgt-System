import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalEntity } from 'src/entities/animal.entity';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AnimalService {
  private readonly logger = new Logger(AnimalService.name);
  constructor(
    @InjectRepository(AnimalEntity)
    private repo: Repository<AnimalEntity>,
  ) {}

  //Get all Animals
  async getAllAnimals(): Promise<AnimalEntity[]> {
    this.logger.log('Start getting details for all Animals');
    const animals = await this.repo.find();
    this.logger.log('Successfully returned All animals');
    return animals;
  }

  //Get One Animal
  //@params - Animal Id
  async getOneAnimal(AnimalId: number): Promise<AnimalEntity> {
    this.logger.log(`Start getting details for animal with Id - ${AnimalId}`);
    const animal = await this.repo.findOne(AnimalId);
    this.logger.log(
      `Successfully returned details for animal with Id - ${AnimalId}`,
    );
    return animal;
  }

  //Get Animals of a Customer
  //@params - customer
  async getCusAnimal(customer: any): Promise<AnimalEntity[]> {
    this.logger.log(
      `Start getting details of animals od Customer - ${customer}`,
    );
    const animal = await this.repo.find({ where: { owner: customer } });
    this.logger.log(
      `Successfully returned details of animals od Customer - ${customer}`,
    );
    return animal;
  }

  //Add New Animal
  async addAnimal(data: {
    name: string;
    gender: string;
    bloodGroup: string;
    dateOfBirth: Date;
    remarks: string;
    breed: string;
    type: any;
    owner: any;
  }): Promise<AnimalEntity> {
    const animal = this.repo.create(data);
    await this.repo.save(animal);
    this.logger.log(`Successfully Added Animal - ${animal.name}`);
    return animal;
  }

  //Edit Existing Animal Data
  //@params - Animal id and to edit description
  async editAnimals(data: {
    name?: string;
    isActive?: boolean;
    gender?: string;
    bloodGroup?: string;
    dateOfBirth?: Date;
    remarks?: string;
    breed?: string;
    type?: any;
    owner?: any;
    id: number;
  }): Promise<AnimalEntity> {
    const animal = await this.repo.findOne(data.id);
    const {
      name,
      gender,
      bloodGroup,
      dateOfBirth,
      remarks,
      type,
      breed,
      owner,
      isActive,
    } = data;

    if (name) animal.name = name;
    if (gender) animal.gender = gender;
    if (bloodGroup) animal.bloodGroup = bloodGroup;
    if (dateOfBirth) animal.dateOfBirth = dateOfBirth;
    if (remarks) animal.remarks = remarks;
    if (type) animal.type = type;
    if (breed) animal.breed = breed;
    if (owner) animal.owner = owner;
    if (isActive) animal.isActive = isActive;

    await this.repo.save(animal);
    this.logger.log(`Successfully Updated details of Animal - ${animal.name}`);
    return animal;
  }

  //Delete Animal
  //@params - Animal id
  async deleteAnimals(data: { id: number }) {
    await getRepository(AnimalEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted animal with Id - ${data.id}`);
  }
}