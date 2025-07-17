export class CreateMedicationDto {
  name: string;
  dosage: string;
  frequency: string;
}

export class UpdateMedicationDto {
  name?: string;
  dosage?: string;
  frequency?: string;
}

export class MedicationQueryDto {
  name?: string;
  dosage?: string;
  frequency?: string;
} 