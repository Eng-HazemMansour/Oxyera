export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  assignments?: any[];
}

export interface CreateMedicationDto {
  name: string;
  dosage: string;
  frequency: string;
}

export interface UpdateMedicationDto {
  name?: string;
  dosage?: string;
  frequency?: string;
}

export interface MedicationQueryDto {
  name?: string;
  dosage?: string;
  frequency?: string;
}

export interface MedicationFormProps {
  onSuccess?: (medication: Medication) => void;
  onError?: (error: Error) => void;
}

export interface MedicationListProps {
  medications: Medication[];
  loading?: boolean;
  onMedicationSelect?: (medication: Medication) => void;
} 