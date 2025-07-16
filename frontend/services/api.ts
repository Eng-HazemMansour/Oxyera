import { apiClient } from '../lib/api-client';
import { Patient, Medication, Assignment, CreatePatientDto, CreateMedicationDto, CreateAssignmentDto } from '../types';

export const patientApi = {
  getAll: (): Promise<Patient[]> => 
    apiClient.get<Patient[]>('/patients'),

  create: (data: CreatePatientDto): Promise<Patient> => 
    apiClient.post<Patient>('/patients', data),
};

export const medicationApi = {
  getAll: (): Promise<Medication[]> => 
    apiClient.get<Medication[]>('/medications'),

  create: (data: CreateMedicationDto): Promise<Medication> => 
    apiClient.post<Medication>('/medications', data),
};

export const assignmentApi = {
  getAllWithRemainingDays: (): Promise<Assignment[]> => 
    apiClient.get<Assignment[]>('/assignments/with-remaining-days'),

  create: (data: CreateAssignmentDto): Promise<Assignment> => 
    apiClient.post<Assignment>('/assignments', data),
}; 