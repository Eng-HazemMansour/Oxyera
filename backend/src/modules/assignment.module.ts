import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentService } from '../models/services/assignment.service';
import { AssignmentController } from '../controllers/assignment.controller';
import { Assignment } from '../models/entities/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment])],
  controllers: [AssignmentController],
  providers: [AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {} 