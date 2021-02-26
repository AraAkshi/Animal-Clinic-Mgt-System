import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TreatmentModule } from './treatment/treatment.module';
import { UsersModule } from './user/user.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { PetTypeModule } from './pet-type/pet-type.module';
import { InventoryModule } from './inventory/inventory.module';
import { EmployeeModule } from './employee/employee.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AnimalModule } from './animal/animal.module';
import { AnimalEntity } from './entities/animal.entity';
import { AppointmentEntity } from './entities/appointment.entity';
import { CustomerEntity } from './entities/customer.entity';
import { EmployeeEntity } from './entities/employee.entity';
import { InventoryEntity } from './entities/inventory.entity';
import { PetTypeEntity } from './entities/petType.entity';
import { ProductCategoryEntity } from './entities/productCategory.entity';
import { TreatmentEntity } from './entities/treatment.entity';
import { UserEntity } from './entities/user.entity';
import { CustomerModule } from './customer/customer.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './_shared/http-error-filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      entities: [
        AnimalEntity,
        AppointmentEntity,
        CustomerEntity,
        EmployeeEntity,
        InventoryEntity,
        PetTypeEntity,
        ProductCategoryEntity,
        TreatmentEntity,
        UserEntity,
      ],
      synchronize: true,
    }),
    AnimalModule,
    AppointmentModule,
    EmployeeModule,
    InventoryModule,
    PetTypeModule,
    ProductCategoryModule,
    UsersModule,
    TreatmentModule,
    AuthModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}