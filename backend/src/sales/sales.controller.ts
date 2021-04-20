import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SalesEntity } from 'src/entities/sales.entity';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private service: SalesService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<SalesEntity[]> {
    return await this.service.getAllRecords();
  }

  @Post('/getCategoryItems')
  // @UseGuards(JwtAuthGuard)
  async getCategoryItems(
    @Body() data: { category: any },
  ): Promise<SalesEntity[]> {
    return await this.service.getCatItems(data.category);
  }

  @Post('/getItemsByDate')
  // @UseGuards(JwtAuthGuard)
  async getItemsByDate(
    @Body() data: { startDate: Date; endDate: Date },
  ): Promise<SalesEntity[]> {
    return await this.service.getRecordsByDate(data.startDate, data.endDate);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      name: string;
      category: any;
      soldQty: number;
      amount: number;
    },
  ): Promise<SalesEntity> {
    return await this.service.addItem(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      name?: string;
      category?: any;
      soldQty?: number;
      amount?: number;
      soldDate?: Date;
      id: number;
    },
  ): Promise<SalesEntity> {
    return await this.service.editItem(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteItem(data);
  }
}
