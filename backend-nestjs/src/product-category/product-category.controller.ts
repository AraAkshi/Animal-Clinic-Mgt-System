import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductCategoryEntity } from 'src/entities/productCategory.entity';
import { ProductCategoryService } from './product-category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private service: ProductCategoryService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<ProductCategoryEntity[]> {
    return await this.service.getAllCategories();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<ProductCategoryEntity> {
    return await this.service.getOneCategory(data.id);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      name: string;
    },
  ): Promise<ProductCategoryEntity> {
    return await this.service.addCategory(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      name?: string;
      id: number;
    },
  ): Promise<ProductCategoryEntity> {
    return await this.service.editCategory(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteCategory(data);
  }
}
