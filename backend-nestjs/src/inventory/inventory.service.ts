import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from 'src/entities/inventory.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
  constructor(
    @InjectRepository(InventoryEntity)
    private repo: Repository<InventoryEntity>,
  ) {}

  //Get all Items
  async getAllItems(): Promise<InventoryEntity[]> {
    this.logger.log('Start getting details for all Items');
    const res = await this.repo.find();
    this.logger.log('Successfully returned All Items');
    return res;
  }

  //Get One Item
  //@params - Item Id
  async getOneItem(id: number): Promise<InventoryEntity> {
    this.logger.log(`Start getting details for Item with Id - ${id}`);
    const res = await this.repo.findOne(id);
    this.logger.log(`Successfully returned details for Item with Id - ${id}`);
    return res;
  }

  //Get Items of the same Category
  //@params - category
  async getCatItems(category: any): Promise<InventoryEntity[]> {
    this.logger.log(`Start getting details of Items of Category - ${category}`);
    const res = await this.repo.find({ where: { category: category } });
    this.logger.log(
      `Successfully returned details of Items of Category - ${category}`,
    );
    return res;
  }

  //Add New Item
  async addItem(data: {
    name: string;
    category: any;
    brand: string;
    unitPurchasePrice: number;
    bufferQty: number;
    quantity: number;
    unitSellingPrice: number;
    purchasedDate: Date;
    manufactureDate: Date;
    expireDate: Date;
  }): Promise<InventoryEntity> {
    const res = this.repo.create(data);
    await this.repo.save(res);
    this.logger.log(`Successfully Added Item - ${data.name}`);
    return res;
  }

  //Edit Existing Item Data
  //@params - Item id and to edit data
  async editItem(data: {
    isEmpty?: boolean;
    name?: string;
    category?: any;
    brand?: string;
    unitPurchasePrice?: number;
    bufferQty?: number;
    quantity?: number;
    unitSellingPrice?: number;
    purchasedDate?: Date;
    manufactureDate?: Date;
    expireDate?: Date;
    id: number;
  }): Promise<InventoryEntity> {
    const res = await this.repo.findOne(data.id);
    const {
      name,
      category,
      brand,
      unitPurchasePrice,
      unitSellingPrice,
      quantity,
      bufferQty,
      purchasedDate,
      manufactureDate,
      expireDate,
      isEmpty,
    } = data;

    if (name) res.name = name;
    if (category) res.category = category;
    if (unitSellingPrice) res.unitSellingPrice = unitSellingPrice;
    if (quantity) res.quantity = quantity;
    if (bufferQty) res.bufferQty = bufferQty;
    if (unitPurchasePrice) res.unitPurchasePrice = unitPurchasePrice;
    if (brand) res.brand = brand;
    if (purchasedDate) res.purchasedDate = purchasedDate;
    if (manufactureDate) res.manufactureDate = manufactureDate;
    if (expireDate) res.expireDate = expireDate;
    if (isEmpty) res.isEmpty = isEmpty;

    await this.repo.save(res);
    this.logger.log(`Successfully Updated details of Item - ${res.name}`);
    return res;
  }

  //Delete Item
  //@params - Item id
  async deleteItem(data: { id: number }) {
    await getRepository(InventoryEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted Item with Id - ${data.id}`);
  }
}
