import type { Patient } from './patient.types';
import type { Medication } from './medication.types';

export interface Assignment {
  id: number;
  startDate: Date;
  days: number;
  patientId: number;
  medicationId: number;
  patient?: Patient;
  medication?: Medication;
  remainingDays?: number;
}

export interface CreateAssignmentDto {
  patientId: number;
  medicationId: number;
  startDate: string;
  days: number;
}

export interface UpdateAssignmentDto {
  patientId?: number;
  medicationId?: number;
  startDate?: string;
  days?: number;
}

export interface AssignmentQueryDto {
  patientId?: number;
  medicationId?: number;
  startDate?: string;
  days?: number;
}

export interface AssignmentFormProps {
  onSuccess?: (assignment: Assignment) => void;
  onError?: (error: Error) => void;
}

export interface AssignmentListProps {
  assignments: Assignment[];
  loading?: boolean;
  onAssignmentSelect?: (assignment: Assignment) => void;
}

export enum TreatmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed', 
  UPCOMING = 'upcoming',
} 