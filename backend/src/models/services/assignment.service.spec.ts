import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentService } from './assignment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assignment } from '../entities/assignment.entity';
import { Repository } from 'typeorm';

describe('AssignmentService', () => {
  let service: AssignmentService;
  let repository: Repository<Assignment>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignmentService,
        {
          provide: getRepositoryToken(Assignment),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AssignmentService>(AssignmentService);
    repository = module.get<Repository<Assignment>>(getRepositoryToken(Assignment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateRemainingDays', () => {
    it('should calculate remaining days correctly for future treatment', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const assignment = {
        id: 1,
        startDate: tomorrow,
        days: 7,
        patientId: 1,
        medicationId: 1,
      } as Assignment;

      const remainingDays = service.calculateRemainingDays(assignment);
      expect(remainingDays).toBe(8);
    });

    it('should return 0 for past treatment', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 10);
      
      const assignment = {
        id: 1,
        startDate: pastDate,
        days: 5,
        patientId: 1,
        medicationId: 1,
      } as Assignment;

      const remainingDays = service.calculateRemainingDays(assignment);
      expect(remainingDays).toBe(0);
    });

    it('should calculate remaining days correctly for current treatment', () => {
      const today = new Date();
      
      const assignment = {
        id: 1,
        startDate: today,
        days: 5,
        patientId: 1,
        medicationId: 1,
      } as Assignment;

      const remainingDays = service.calculateRemainingDays(assignment);
      expect(remainingDays).toBe(5);
    });
  });
}); 