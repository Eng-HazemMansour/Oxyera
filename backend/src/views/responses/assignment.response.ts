import { PatientResponse } from './patient.response';
import { MedicationResponse } from './medication.response';

export class AssignmentResponse {
  id: number;
  startDate: Date;
  days: number;
  patientId: number;
  medicationId: number;
  patient?: PatientResponse;
  medication?: MedicationResponse;
  remainingDays?: number;

  constructor(partial: Partial<AssignmentResponse>) {
    Object.assign(this, partial);
  }
} 