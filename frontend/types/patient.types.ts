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