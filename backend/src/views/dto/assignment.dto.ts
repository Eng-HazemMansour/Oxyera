import { IsNotEmpty, IsNumber, IsDateString, IsOptional, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  patientId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  medicationId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  days: number;
}

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  patientId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  medicationId?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  days?: number;
}

export class AssignmentQueryDto {
  @IsOptional()
  @IsNumber()
  patientId?: number;

  @IsOptional()
  @IsNumber()
  medicationId?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsNumber()
  days?: number;
} 