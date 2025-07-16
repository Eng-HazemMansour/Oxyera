import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { CreatePatientDto, UpdatePatientDto } from '../../views/dto/patient.dto';
import { PatientResponse } from '../../views/responses/patient.response';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<PatientResponse> {
    const patient = this.patientRepository.create({
      ...createPatientDto,
      dateOfBirth: new Date(createPatientDto.dateOfBirth),
    });
    const savedPatient = await this.patientRepository.save(patient);
    return new PatientResponse(savedPatient);
  }

  async findAll(): Promise<PatientResponse[]> {
    const patients = await this.patientRepository.find({
      relations: ['assignments', 'assignments.medication'],
    });
    return patients.map(patient => new PatientResponse(patient));
  }

  async findOne(id: number): Promise<PatientResponse> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['assignments', 'assignments.medication'],
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return new PatientResponse(patient);
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<PatientResponse> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    
    const updateData: any = { ...updatePatientDto };
    if ('dateOfBirth' in updatePatientDto && updatePatientDto.dateOfBirth) {
      updateData.dateOfBirth = new Date(updatePatientDto.dateOfBirth);
    }
    Object.assign(patient, updateData);
    const savedPatient = await this.patientRepository.save(patient);
    return new PatientResponse(savedPatient);
  }

  async remove(id: number): Promise<void> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    await this.patientRepository.remove(patient);
  }
} 