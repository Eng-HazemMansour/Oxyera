import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientApi, medicationApi, assignmentApi } from '../services/api';
import { Patient, Medication, Assignment, CreatePatientDto, CreateMedicationDto, CreateAssignmentDto, UpdatePatientDto, UpdateMedicationDto, UpdateAssignmentDto, QueryOptions, MutationOptions } from '../types';

export const queryKeys = {
  patients: {
    all: ['patients'] as const,
    detail: (id: number) => ['patients', id] as const,
  },
  medications: {
    all: ['medications'] as const,
    detail: (id: number) => ['medications', id] as const,
  },
  assignments: {
    all: ['assignments'] as const,
    withRemainingDays: ['assignments', 'remaining-days'] as const,
    detail: (id: number) => ['assignments', id] as const,
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

export const usePatient = (id: number, options?: QueryOptions) => {
  return useQuery({
    queryKey: queryKeys.patients.detail(id),
    queryFn: () => patientApi.getById(id),
    enabled: !!id,
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
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.withRemainingDays });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
};

export const useUpdatePatient = (options?: MutationOptions<Patient>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePatientDto }) => 
      patientApi.update(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.patients.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
};

export const useDeletePatient = (options?: MutationOptions<void>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: patientApi.delete,
    onSuccess: (_, patientId) => {
      queryClient.removeQueries({ queryKey: queryKeys.patients.detail(patientId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      
      options?.onSuccess?.();
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

export const useMedication = (id: number, options?: QueryOptions) => {
  return useQuery({
    queryKey: queryKeys.medications.detail(id),
    queryFn: () => medicationApi.getById(id),
    enabled: !!id,
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
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
};

export const useUpdateMedication = (options?: MutationOptions<Medication>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMedicationDto }) => 
      medicationApi.update(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.medications.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.medications.all });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
};

export const useDeleteMedication = (options?: MutationOptions<void>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: medicationApi.delete,
    onSuccess: (_, medicationId) => {
      queryClient.removeQueries({ queryKey: queryKeys.medications.detail(medicationId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.medications.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
};

export const useAssignments = (options?: QueryOptions) => {
  return useQuery({
    queryKey: queryKeys.assignments.all,
    queryFn: assignmentApi.getAll,
    ...defaultQueryOptions,
    ...options,
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

export const useAssignment = (id: number, options?: QueryOptions) => {
  return useQuery({
    queryKey: queryKeys.assignments.detail(id),
    queryFn: () => assignmentApi.getById(id),
    enabled: !!id,
    ...defaultQueryOptions,
    ...options,
  });
};

export const useCreateAssignment = (options?: MutationOptions<Assignment>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: assignmentApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
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

export const useUpdateAssignment = (options?: MutationOptions<Assignment>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAssignmentDto }) => 
      assignmentApi.update(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.assignments.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.withRemainingDays });
      
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
};

export const useDeleteAssignment = (options?: MutationOptions<void>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: assignmentApi.delete,
    onSuccess: (_, assignmentId) => {
      queryClient.removeQueries({ queryKey: queryKeys.assignments.detail(assignmentId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.withRemainingDays });
      
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
}; 