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