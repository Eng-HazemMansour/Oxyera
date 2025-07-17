import { Injectable } from '@nestjs/common';
import { BaseValidationMiddleware } from './validation.middleware';
import {
  patientValidationSchema,
  updatePatientValidationSchema,
  medicationValidationSchema,
  updateMedicationValidationSchema,
  assignmentValidationSchema,
  updateAssignmentValidationSchema,
} from './schemas';

@Injectable()
export class CreatePatientValidationMiddleware extends BaseValidationMiddleware {
  protected getSchema() {
    return patientValidationSchema;
  }
}

@Injectable()
export class UpdatePatientValidationMiddleware extends BaseValidationMiddleware {
  protected getSchema() {
    return updatePatientValidationSchema;
  }
}

@Injectable()
export class CreateMedicationValidationMiddleware extends BaseValidationMiddleware {
  protected getSchema() {
    return medicationValidationSchema;
  }
}

@Injectable()
export class UpdateMedicationValidationMiddleware extends BaseValidationMiddleware {
  protected getSchema() {
    return updateMedicationValidationSchema;
  }
}

@Injectable()
export class CreateAssignmentValidationMiddleware extends BaseValidationMiddleware {
  protected getSchema() {
    return assignmentValidationSchema;
  }
}

@Injectable()
export class UpdateAssignmentValidationMiddleware extends BaseValidationMiddleware {
  protected getSchema() {
    return updateAssignmentValidationSchema;
  }
} 