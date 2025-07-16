import { apiClient } from '../lib/api-client';
import { Patient, Medication, Assignment, CreatePatientDto, CreateMedicationDto, CreateAssignmentDto, UpdatePatientDto, UpdateMedicationDto, UpdateAssignmentDto } from '../types';

export const patientApi = {
  getAll: (): Promise<Patient[]> => 
    apiClient.get<Patient[]>('/patients'),

  getById: (id: number): Promise<Patient> => 
    apiClient.get<Patient>(`/patients/${id}`),

  create: (data: CreatePatientDto): Promise<Patient> => 
    apiClient.post<Patient>('/patients', data),

  update: (id: number, data: UpdatePatientDto): Promise<Patient> => 
    apiClient.patch<Patient>(`/patients/${id}`, data),

  delete: (id: number): Promise<void> => 
    apiClient.delete<void>(`/patients/${id}`),
};

export const medicationApi = {
  getAll: (): Promise<Medication[]> => 
    apiClient.get<Medication[]>('/medications'),

  getById: (id: number): Promise<Medication> => 
    apiClient.get<Medication>(`/medications/${id}`),

  create: (data: CreateMedicationDto): Promise<Medication> => 
    apiClient.post<Medication>('/medications', data),

  update: (id: number, data: UpdateMedicationDto): Promise<Medication> => 
    apiClient.patch<Medication>(`/medications/${id}`, data),

  delete: (id: number): Promise<void> => 
    apiClient.delete<void>(`/medications/${id}`),
};

export const assignmentApi = {
  getAll: (): Promise<Assignment[]> => 
    apiClient.get<Assignment[]>('/assignments'),

  getById: (id: number): Promise<Assignment> => 
    apiClient.get<Assignment>(`/assignments/${id}`),

  getAllWithRemainingDays: (): Promise<Assignment[]> => 
    apiClient.get<Assignment[]>('/assignments/with-remaining-days'),

  create: (data: CreateAssignmentDto): Promise<Assignment> => 
    apiClient.post<Assignment>('/assignments', data),

  update: (id: number, data: UpdateAssignmentDto): Promise<Assignment> => 
    apiClient.patch<Assignment>(`/assignments/${id}`, data),

  delete: (id: number): Promise<void> => 
    apiClient.delete<void>(`/assignments/${id}`),
};

export const api = {
  patients: patientApi,
  medications: medicationApi,
  assignments: assignmentApi,
}; 