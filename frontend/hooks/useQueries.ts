import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientApi, medicationApi, assignmentApi } from '../services/api';
import { Patient, Medication, Assignment, CreatePatientDto, CreateMedicationDto, CreateAssignmentDto, QueryOptions, MutationOptions } from '../types';

export const queryKeys = {
  patients: {
    all: ['patients'] as const,
  },
  medications: {
    all: ['medications'] as const,
  },
  assignments: {
    withRemainingDays: ['assignments', 'remaining-days'] as const,
  },
} as const;

const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000,
  retry: 3,
  refetchOnWindowFocus: false,
};

export const usePatients = (options?: QueryOptions) => {
  return useQuery({
    queryKey: queryKeys.patients.all,
    queryFn: patientApi.getAll,
    ...defaultQueryOptions,
    ...options,
  });
};

export const useCreatePatient = (options?: MutationOptions<Patient>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: patientApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.withRemainingDays });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
};

export const useMedications = (options?: QueryOptions) => {
  return useQuery({
    queryKey: queryKeys.medications.all,
    queryFn: medicationApi.getAll,
    ...defaultQueryOptions,
    ...options,
  });
};

export const useCreateMedication = (options?: MutationOptions<Medication>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: medicationApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.medications.all });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
};

export const useAssignmentsWithRemainingDays = (options?: QueryOptions) => {
  return useQuery({
    queryKey: queryKeys.assignments.withRemainingDays,
    queryFn: assignmentApi.getAllWithRemainingDays,
    ...defaultQueryOptions,
    staleTime: 1 * 60 * 1000,
    ...options,
  });
};

export const useCreateAssignment = (options?: MutationOptions<Assignment>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: assignmentApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.withRemainingDays });
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.medications.all });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
}; 