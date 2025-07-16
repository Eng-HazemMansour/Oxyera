import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from '../entities/medication.entity';
import { CreateMedicationDto, UpdateMedicationDto } from '../../views/dto/medication.dto';
import { MedicationResponse } from '../../views/responses/medication.response';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  async create(createMedicationDto: CreateMedicationDto): Promise<MedicationResponse> {
    const medication = this.medicationRepository.create(createMedicationDto);
    const savedMedication = await this.medicationRepository.save(medication);
    return new MedicationResponse(savedMedication);
  }

  async findAll(): Promise<MedicationResponse[]> {
    const medications = await this.medicationRepository.find({
      relations: ['assignments', 'assignments.patient'],
    });
    return medications.map(medication => new MedicationResponse(medication));
  }

  async findOne(id: number): Promise<MedicationResponse> {
    const medication = await this.medicationRepository.findOne({
      where: { id },
      relations: ['assignments', 'assignments.patient'],
    });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
    return new MedicationResponse(medication);
  }

  async update(id: number, updateMedicationDto: UpdateMedicationDto): Promise<MedicationResponse> {
    const medication = await this.medicationRepository.findOne({ where: { id } });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
    Object.assign(medication, updateMedicationDto);
    const savedMedication = await this.medicationRepository.save(medication);
    return new MedicationResponse(savedMedication);
  }

  async remove(id: number): Promise<void> {
    const medication = await this.medicationRepository.findOne({ where: { id } });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
    await this.medicationRepository.remove(medication);
  }
} 