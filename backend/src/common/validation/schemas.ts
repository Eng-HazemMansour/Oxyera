import * as yup from 'yup';

export const patientValidationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  dateOfBirth: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .min(new Date('1900-01-01'), 'Please enter a valid date of birth'),
});

export const updatePatientValidationSchema = yup.object({
  name: yup
    .string()
    .optional()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  dateOfBirth: yup
    .date()
    .optional()
    .max(new Date(), 'Date of birth cannot be in the future')
    .min(new Date('1900-01-01'), 'Please enter a valid date of birth'),
});

export const medicationValidationSchema = yup.object({
  name: yup
    .string()
    .required('Medication name is required')
    .min(2, 'Medication name must be at least 2 characters')
    .max(200, 'Medication name must be less than 200 characters')
    .trim(),
  dosage: yup
    .string()
    .required('Dosage is required')
    .min(1, 'Dosage is required')
    .max(50, 'Dosage must be less than 50 characters')
    .trim(),
  frequency: yup
    .string()
    .required('Frequency is required')
    .min(1, 'Frequency is required')
    .max(100, 'Frequency must be less than 100 characters')
    .trim(),
});

export const updateMedicationValidationSchema = yup.object({
  name: yup
    .string()
    .optional()
    .min(2, 'Medication name must be at least 2 characters')
    .max(200, 'Medication name must be less than 200 characters')
    .trim(),
  dosage: yup
    .string()
    .optional()
    .min(1, 'Dosage is required')
    .max(50, 'Dosage must be less than 50 characters')
    .trim(),
  frequency: yup
    .string()
    .optional()
    .min(1, 'Frequency is required')
    .max(100, 'Frequency must be less than 100 characters')
    .trim(),
});

export const assignmentValidationSchema = yup.object({
  patientId: yup
    .number()
    .required('Patient selection is required')
    .min(1, 'Please select a patient')
    .integer('Patient ID must be a whole number'),
  medicationId: yup
    .number()
    .required('Medication selection is required')
    .min(1, 'Please select a medication')
    .integer('Medication ID must be a whole number'),
  startDate: yup
    .date()
    .required('Start date is required')
    .min(new Date(Date.now() - 24 * 60 * 60 * 1000), 'Start date cannot be more than 1 day in the past'),
  days: yup
    .number()
    .required('Number of days is required')
    .min(1, 'Treatment must be at least 1 day')
    .max(365, 'Treatment cannot exceed 365 days')
    .integer('Number of days must be a whole number'),
});

export const updateAssignmentValidationSchema = yup.object({
  patientId: yup
    .number()
    .optional()
    .min(1, 'Please select a patient')
    .integer('Patient ID must be a whole number'),
  medicationId: yup
    .number()
    .optional()
    .min(1, 'Please select a medication')
    .integer('Medication ID must be a whole number'),
  startDate: yup
    .date()
    .optional()
    .min(new Date(Date.now() - 24 * 60 * 60 * 1000), 'Start date cannot be more than 1 day in the past'),
  days: yup
    .number()
    .optional()
    .min(1, 'Treatment must be at least 1 day')
    .max(365, 'Treatment cannot exceed 365 days')
    .integer('Number of days must be a whole number'),
}); 