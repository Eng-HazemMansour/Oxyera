import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { PatientService } from '../models/services/patient.service';
import { CreatePatientDto, UpdatePatientDto } from '../views/dto/patient.dto';
import { PatientResponse } from '../views/responses/patient.response';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createPatientDto: CreatePatientDto): Promise<PatientResponse> {
    return await this.patientService.create(createPatientDto);
  }

  @Get()
  async findAll(): Promise<PatientResponse[]> {
    return await this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PatientResponse> {
    return await this.patientService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updatePatientDto: UpdatePatientDto): Promise<PatientResponse> {
    return await this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.patientService.remove(+id);
  }
} 