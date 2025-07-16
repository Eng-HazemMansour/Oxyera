import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from './patient.entity';
import { Medication } from './medication.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column()
  days: number;

  @ManyToOne(() => Patient, patient => patient.assignments)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  patientId: number;

  @ManyToOne(() => Medication, medication => medication.assignments)
  @JoinColumn({ name: 'medicationId' })
  medication: Medication;

  @Column()
  medicationId: number;
} 