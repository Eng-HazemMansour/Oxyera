export class MedicationResponse {
  id: number;
  name: string;
  dosage: string;
  frequency: string;

  constructor(partial: Partial<MedicationResponse>) {
    Object.assign(this, partial);
  }
} 