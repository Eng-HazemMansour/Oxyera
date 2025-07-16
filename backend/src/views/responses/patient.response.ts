export class PatientResponse {
  id: number;
  name: string;
  dateOfBirth: Date;
  assignments?: any[];

  constructor(partial: Partial<PatientResponse>) {
    Object.assign(this, partial);
  }
} 