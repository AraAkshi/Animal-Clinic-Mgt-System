import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryEntity } from 'src/entities/productCategory.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class ProductCategoryService {
  private readonly logger = new Logger(ProductCategoryService.name);
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private repo: Repository<ProductCategoryEntity>,
  ) {}

  //Get all Categories
  async getAllCategories(): Promise<ProductCategoryEntity[]> {
    this.logger.log('Start getting details for all Categories');
    const res = await this.repo.find();
    this.logger.log('Successfully returned All Categories');
    return res;
  }

  //Get One Category
  //@params - Category Id
  async getOneCategory(id: number): Promise<ProductCategoryEntity> {
    this.logger.log(`Start getting details for Category with Id - ${id}`);
    const res = await this.repo.findOne(id);
    this.logger.log(
      `Successfully returned details for Category with Id - ${id}`,
    );
    return res;
  }

  //Add New Category
  async addCategory(data: {
    name: string;
    imagePath: string;
  }): Promise<ProductCategoryEntity> {
    data.name = data.name.toUpperCase();
    const res = this.repo.create(data);
    await this.repo.save(res);
    this.logger.log(`Successfully Added Category - ${data.name}`);
    return res;
  }

  //Edit Existing Category Data
  //@params - Category id and to edit data
  async editCategory(data: {
    name?: string;
    imagePath?: string;
    id: number;
  }): Promise<ProductCategoryEntity> {
    const res = await this.repo.findOne(data.id);
    const { name, imagePath } = data;

    if (name) res.name = name;
    if (imagePath) res.imagePath = imagePath;

    await this.repo.save(res);
    this.logger.log(`Successfully Updated details of Category - ${res.name}`);
    return res;
  }

  //Delete Category
  //@params - Category id
  async deleteCategory(data: { id: number }) {
    await getRepository(ProductCategoryEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted Category with Id - ${data.id}`);
  }
}
