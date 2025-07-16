import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { MedicationService } from '../models/services/medication.service';
import { CreateMedicationDto, UpdateMedicationDto } from '../views/dto/medication.dto';
import { MedicationResponse } from '../views/responses/medication.response';

@Controller('medications')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createMedicationDto: CreateMedicationDto): Promise<MedicationResponse> {
    return await this.medicationService.create(createMedicationDto);
  }

  @Get()
  async findAll(): Promise<MedicationResponse[]> {
    return await this.medicationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MedicationResponse> {
    return await this.medicationService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateMedicationDto: UpdateMedicationDto): Promise<MedicationResponse> {
    return await this.medicationService.update(+id, updateMedicationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.medicationService.remove(+id);
  }
} 