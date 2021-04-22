import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { EmployeeEntity } from 'src/entities/employee.entity';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<EmployeeEntity[]> {
    return await this.service.getAllEmployees();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { email: string }): Promise<EmployeeEntity> {
    return await this.service.getOneEmployee(data.email);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      nic: string;
      name: string;
      email: string;
      address: string;
      designation: string;
      epfNo: number;
      contact: number;
      joinedDate: Date;
    },
  ): Promise<EmployeeEntity> {
    return await this.service.addEmployee(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      isActive?: boolean;
      nic?: string;
      name?: string;
      email?: string;
      address?: string;
      designation?: string;
      epfNo?: number;
      contact?: number;
      joinedDate?: Date;
      id: number;
    },
  ): Promise<EmployeeEntity> {
    return await this.service.editEmployee(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteEmployees(data);
  }
}
