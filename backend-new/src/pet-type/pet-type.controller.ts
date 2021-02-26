import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PetTypeEntity } from 'src/entities/petType.entity';
import { PetTypeService } from './pet-type.service';

@Controller('pet-type')
export class PetTypeController {
  constructor(private service: PetTypeService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<PetTypeEntity[]> {
    return await this.service.getAllPetTypes();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<PetTypeEntity> {
    return await this.service.getOneType(data.id);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      name: string;
    },
  ): Promise<PetTypeEntity> {
    return await this.service.addType(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      name?: string;
      id: number;
    },
  ): Promise<PetTypeEntity> {
    return await this.service.editType(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteType(data);
  }
}
