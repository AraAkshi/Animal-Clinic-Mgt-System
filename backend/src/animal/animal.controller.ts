import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AnimalEntity } from 'src/entities/animal.entity';
import { AnimalService } from './animal.service';

@Controller('animal')
export class AnimalController {
  constructor(private service: AnimalService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<AnimalEntity[]> {
    return await this.service.getAllAnimals();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<AnimalEntity> {
    return await this.service.getOneAnimal(data.id);
  }

  @Post('/getCusAnimals')
  // @UseGuards(JwtAuthGuard)
  async getCusAnimals(
    @Body() data: { customer: any },
  ): Promise<AnimalEntity[]> {
    return await this.service.getCusAnimal(data.customer);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      name: string;
      gender: string;
      bloodGroup: string;
      dateOfBirth: Date;
      remarks: string;
      breed: string;
      type: any;
      owner: any;
    },
  ): Promise<AnimalEntity> {
    return await this.service.addAnimal(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      name?: string;
      isActive?: boolean;
      gender?: string;
      bloodGroup?: string;
      dateOfBirth?: Date;
      remarks?: string;
      breed?: string;
      type?: any;
      owner?: any;
      treatments?: any;
      appointments?: any;
      id: number;
    },
  ): Promise<AnimalEntity> {
    return await this.service.editAnimals(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteAnimals(data);
  }
}
