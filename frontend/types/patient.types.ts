export interface Patient {
  id: number;
  name: string;
  dateOfBirth: Date;
  assignments?: any[];
}

export interface CreatePatientDto {
  name: string;
  dateOfBirth: string;
}

export interface UpdatePatientDto {
  name?: string;
  dateOfBirth?: string;
}

export interface PatientQueryDto {
  name?: string;
  dateOfBirth?: string;
}

export interface PatientFormProps {
  onSuccess?: (patient: Patient) => void;
  onError?: (error: Error) => void;
}

export interface PatientListProps {
  patients: Patient[];
  loading?: boolean;
  onPatientSelect?: (patient: Patient) => void;
} 