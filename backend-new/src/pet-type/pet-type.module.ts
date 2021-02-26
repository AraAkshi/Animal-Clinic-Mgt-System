import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetTypeEntity } from 'src/entities/petType.entity';
import { PetTypeController } from './pet-type.controller';
import { PetTypeService } from './pet-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetTypeEntity])],
  controllers: [PetTypeController],
  providers: [PetTypeService],
  exports: [PetTypeService],
})
export class PetTypeModule {}
