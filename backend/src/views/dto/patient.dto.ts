import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;
}

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}

export class PatientQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;
} 