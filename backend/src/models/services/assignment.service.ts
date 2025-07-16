import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from '../entities/assignment.entity';
import { CreateAssignmentDto, UpdateAssignmentDto } from '../../views/dto/assignment.dto';
import { AssignmentResponse } from '../../views/responses/assignment.response';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<AssignmentResponse> {
    const assignment = this.assignmentRepository.create({
      ...createAssignmentDto,
      startDate: new Date(createAssignmentDto.startDate),
    });
    const savedAssignment = await this.assignmentRepository.save(assignment);
    return new AssignmentResponse(savedAssignment);
  }

  async findAll(): Promise<AssignmentResponse[]> {
    const assignments = await this.assignmentRepository.find({
      relations: ['patient', 'medication'],
    });
    return assignments.map(assignment => new AssignmentResponse(assignment));
  }

  async findOne(id: number): Promise<AssignmentResponse> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['patient', 'medication'],
    });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return new AssignmentResponse(assignment);
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<AssignmentResponse> {
    const assignment = await this.assignmentRepository.findOne({ where: { id } });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    
    const updateData: any = { ...updateAssignmentDto };
    if ('startDate' in updateAssignmentDto && updateAssignmentDto.startDate) {
      updateData.startDate = new Date(updateAssignmentDto.startDate as string);
    }
    Object.assign(assignment, updateData);
    const savedAssignment = await this.assignmentRepository.save(assignment);
    return new AssignmentResponse(savedAssignment);
  }

  async remove(id: number): Promise<void> {
    const assignment = await this.assignmentRepository.findOne({ where: { id } });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    await this.assignmentRepository.remove(assignment);
  }

  calculateRemainingDays(assignment: Assignment): number {
    const today = new Date();
    const startDate = new Date(assignment.startDate);
    const endDate = new Date(startDate.getTime() + (assignment.days * 24 * 60 * 60 * 1000));
    
    const remainingTime = endDate.getTime() - today.getTime();
    const remainingDays = Math.ceil(remainingTime / (24 * 60 * 60 * 1000));
    
    return Math.max(0, remainingDays);
  }

  async getAssignmentsWithRemainingDays(): Promise<AssignmentResponse[]> {
    const assignments = await this.assignmentRepository.find({
      relations: ['patient', 'medication'],
    });
    return assignments.map(assignment => {
      const response = new AssignmentResponse(assignment);
      response.remainingDays = this.calculateRemainingDays(assignment);
      return response;
    });
  }
} 