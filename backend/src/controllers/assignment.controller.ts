import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AssignmentService } from '../models/services/assignment.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from '../views/dto/assignment.dto';
import { AssignmentResponse } from '../views/responses/assignment.response';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createAssignmentDto: CreateAssignmentDto): Promise<AssignmentResponse> {
    return await this.assignmentService.create(createAssignmentDto);
  }

  @Get()
  async findAll(): Promise<AssignmentResponse[]> {
    return await this.assignmentService.findAll();
  }

  @Get('with-remaining-days')
  async getAssignmentsWithRemainingDays(): Promise<AssignmentResponse[]> {
    return await this.assignmentService.getAssignmentsWithRemainingDays();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AssignmentResponse> {
    return await this.assignmentService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateAssignmentDto: UpdateAssignmentDto): Promise<AssignmentResponse> {
    return await this.assignmentService.update(+id, updateAssignmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.assignmentService.remove(+id);
  }
} 