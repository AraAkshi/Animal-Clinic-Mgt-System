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
    const res = await getRepository(InventoryEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.category', 'category')
      .getMany();
    return res;
  }

  //Get One Item
  //@params - Item Id
  async getOneItem(id: number): Promise<InventoryEntity> {
    this.logger.log(`Start getting details for Item with Id - ${id}`);
    const res = await getRepository(InventoryEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.category', 'category')
      .where('tbl.id = :id')
      .setParameter('id', id)
      .getOne();
    this.logger.log(`Successfully returned details for Item with Id - ${id}`);
    return res;
  }

  //Get Items of the same Category
  //@params - category
  async getCatItems(category: any): Promise<InventoryEntity[]> {
    this.logger.log(`Start getting details of Items of Category - ${category}`);
    const res = await getRepository(InventoryEntity)
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

  //Add New Item
  async addItem(data: {
    name: string;
    category: any;
    brand: string;
    unitPurchasePrice: number;
    bufferQty: number;
    batchNo: string;
    quantity: number;
    unitSellingPrice: number;
    purchasedDate: Date;
    manufactureDate: Date;
    expireDate: Date;
    notifyBefore: number;
  }): Promise<InventoryEntity> {
    Object.assign(data, { addedDate: new Date(), soldQty: 0 });
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
    soldQty?: number;
    batchNo?: string;
    quantity?: number;
    unitSellingPrice?: number;
    purchasedDate?: Date;
    manufactureDate?: Date;
    expireDate?: Date;
    notifyBefore?: number;
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
      soldQty,
      batchNo,
      purchasedDate,
      manufactureDate,
      expireDate,
      isEmpty,
      notifyBefore,
    } = data;

    if (name) res.name = name;
    if (category) res.category = category;
    if (unitSellingPrice) res.unitSellingPrice = unitSellingPrice;
    if (quantity) res.quantity = quantity;
    if (bufferQty) res.bufferQty = bufferQty;
    if (soldQty) res.soldQty = soldQty;
    if (batchNo) res.batchNo = batchNo;
    if (unitPurchasePrice) res.unitPurchasePrice = unitPurchasePrice;
    if (brand) res.brand = brand;
    if (purchasedDate) res.purchasedDate = purchasedDate;
    if (manufactureDate) res.manufactureDate = manufactureDate;
    if (expireDate) res.expireDate = expireDate;
    if (notifyBefore) res.notifyBefore = notifyBefore;
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
