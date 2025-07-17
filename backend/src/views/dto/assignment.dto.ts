export class CreateAssignmentDto {
  patientId: number;
  medicationId: number;
  startDate: string;
  days: number;
}

export class UpdateAssignmentDto {
  patientId?: number;
  medicationId?: number;
  startDate?: string;
  days?: number;
}

export class AssignmentQueryDto {
  patientId?: number;
  medicationId?: number;
  startDate?: string;
  days?: number;
} 