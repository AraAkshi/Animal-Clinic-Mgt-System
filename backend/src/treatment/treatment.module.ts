import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentEntity } from 'src/entities/treatment.entity';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentEntity])],
  controllers: [TreatmentController],
  providers: [TreatmentService],
  exports: [TreatmentService],
})
export class TreatmentModule {}
