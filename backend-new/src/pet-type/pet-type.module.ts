import { Module } from '@nestjs/common';
import { PetTypeController } from './pet-type.controller';
import { PetTypeService } from './pet-type.service';

@Module({
  imports: [],
  controllers: [PetTypeController],
  providers: [PetTypeService],
  exports: [PetTypeService],
})
export class PetTypeModule {}
