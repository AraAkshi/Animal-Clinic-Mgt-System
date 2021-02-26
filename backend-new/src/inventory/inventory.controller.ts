import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { InventoryEntity } from 'src/entities/inventory.entity';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private service: InventoryService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<InventoryEntity[]> {
    return await this.service.getAllItems();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<InventoryEntity> {
    return await this.service.getOneItem(data.id);
  }

  @Post('/getCategoryItems')
  // @UseGuards(JwtAuthGuard)
  async getCategoryItems(
    @Body() data: { category: any },
  ): Promise<InventoryEntity[]> {
    return await this.service.getCatItems(data.category);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
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
    },
  ): Promise<InventoryEntity> {
    return await this.service.addItem(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
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
    },
  ): Promise<InventoryEntity> {
    return await this.service.editItem(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteItem(data);
  }
}
