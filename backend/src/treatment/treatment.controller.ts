import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TreatmentEntity } from 'src/entities/treatment.entity';
import { TreatmentService } from './treatment.service';

@Controller('treatment')
export class TreatmentController {
  constructor(private service: TreatmentService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<TreatmentEntity[]> {
    return await this.service.getAllTreatments();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<TreatmentEntity> {
    return await this.service.getOneTreatment(data.id);
  }

  @Post('/getCustomerTreatments')
  // @UseGuards(JwtAuthGuard)
  async getCustomerTreatments(
    @Body() data: { customer: any },
  ): Promise<TreatmentEntity[]> {
    return await this.service.getCusTreatments(data.customer);
  }

  @Post('/getAnimalTreatments')
  // @UseGuards(JwtAuthGuard)
  async getAnimalTreatments(
    @Body() data: { animal: any },
  ): Promise<TreatmentEntity[]> {
    return await this.service.getAnimlTreatments(data.animal);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      treatmentType: string;
      customer: any;
      animal: any;
      itemsUsed: any;
      description: string;
      dateReceived: Date;
      timeReceived: string;
      nextTreatmentDate: Date;
    },
  ): Promise<TreatmentEntity> {
    return await this.service.addTreatment(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      treatmentType?: string;
      customer?: any;
      animal?: any;
      itemsUsed?: any;
      description?: string;
      dateReceived?: Date;
      timeReceived?: string;
      nextTreatmentDate?: Date;
      id: number;
    },
  ): Promise<TreatmentEntity> {
    return await this.service.editTreatment(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteTreatment(data);
  }
}
