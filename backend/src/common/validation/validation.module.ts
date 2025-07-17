import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import {
  CreatePatientValidationMiddleware,
  UpdatePatientValidationMiddleware,
  CreateMedicationValidationMiddleware,
  UpdateMedicationValidationMiddleware,
  CreateAssignmentValidationMiddleware,
  UpdateAssignmentValidationMiddleware,
} from './middlewares';

@Module({
  providers: [
    CreatePatientValidationMiddleware,
    UpdatePatientValidationMiddleware,
    CreateMedicationValidationMiddleware,
    UpdateMedicationValidationMiddleware,
    CreateAssignmentValidationMiddleware,
    UpdateAssignmentValidationMiddleware,
  ],
  exports: [
    CreatePatientValidationMiddleware,
    UpdatePatientValidationMiddleware,
    CreateMedicationValidationMiddleware,
    UpdateMedicationValidationMiddleware,
    CreateAssignmentValidationMiddleware,
    UpdateAssignmentValidationMiddleware,
  ],
})
export class ValidationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreatePatientValidationMiddleware)
      .forRoutes({ path: 'patients', method: RequestMethod.POST });

    consumer
      .apply(UpdatePatientValidationMiddleware)
      .forRoutes({ path: 'patients/:id', method: RequestMethod.PATCH });

    consumer
      .apply(CreateMedicationValidationMiddleware)
      .forRoutes({ path: 'medications', method: RequestMethod.POST });

    consumer
      .apply(UpdateMedicationValidationMiddleware)
      .forRoutes({ path: 'medications/:id', method: RequestMethod.PATCH });

    consumer
      .apply(CreateAssignmentValidationMiddleware)
      .forRoutes({ path: 'assignments', method: RequestMethod.POST });

    consumer
      .apply(UpdateAssignmentValidationMiddleware)
      .forRoutes({ path: 'assignments/:id', method: RequestMethod.PATCH });
  }
} 