import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PatientModule } from './modules/patient.module';
import { MedicationModule } from './modules/medication.module';
import { AssignmentModule } from './modules/assignment.module';
import { ValidationModule } from './common/validation/validation.module';
import { getDatabaseConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    ValidationModule,
    PatientModule,
    MedicationModule,
    AssignmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
