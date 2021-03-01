import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CustomerEntity } from 'src/entities/customer.entity';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private service: CustomerService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<CustomerEntity[]> {
    return await this.service.getAllCustomers();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<CustomerEntity> {
    return await this.service.getOneCustomer(data.id);
  }

  @Post('/getOneByEmail')
  // @UseGuards(JwtAuthGuard)
  async getOneByEmail(
    @Body() data: { email: string },
  ): Promise<CustomerEntity> {
    return await this.service.getCusByEmail(data.email);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      name: string;
      email: string;
      address: string;
      contact: number;
      remarks: string;
    },
  ): Promise<CustomerEntity> {
    return await this.service.addCustomer(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      isActive?: boolean;
      name?: string;
      email?: string;
      address?: string;
      contact?: number;
      remarks?: string;
      id: number;
    },
  ): Promise<CustomerEntity> {
    return await this.service.editCustomer(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteCustomers(data);
  }
}
