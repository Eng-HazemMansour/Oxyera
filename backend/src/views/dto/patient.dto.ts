export class CreatePatientDto {
  name: string;
  dateOfBirth: string;
}

export class UpdatePatientDto {
  name?: string;
  dateOfBirth?: string;
}

export class PatientQueryDto {
  name?: string;
  dateOfBirth?: string;
} 