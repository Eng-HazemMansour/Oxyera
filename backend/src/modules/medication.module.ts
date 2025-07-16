import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationService } from '../models/services/medication.service';
import { MedicationController } from '../controllers/medication.controller';
import { Medication } from '../models/entities/medication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  controllers: [MedicationController],
  providers: [MedicationService],
  exports: [MedicationService],
})
export class MedicationModule {} 