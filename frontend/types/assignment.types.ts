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