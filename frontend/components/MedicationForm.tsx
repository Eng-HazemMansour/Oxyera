'use client';

import { Formik, Form } from 'formik';
import { useCreateMedication } from '../hooks/useQueries';
import { CreateMedicationDto } from '../types';
import { medicationValidationSchema } from '../lib/validationSchemas';
import { Card, Input, Button, Alert } from './ui';

const initialValues: CreateMedicationDto = {
  name: '',
  dosage: '',
  frequency: '',
};

export default function MedicationForm() {
  const createMedicationMutation = useCreateMedication();

  const handleSubmit = async (values: CreateMedicationDto, { resetForm }: { resetForm: () => void }) => {
    try {
      await createMedicationMutation.mutateAsync(values);
      resetForm();
    } catch (_error) {
    }
  };

  return (
    <Card variant="elevated" className="animate-slide-up">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-100 rounded-lg">
          <span className="text-green-600 text-2xl">💊</span>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900">Add New Medication</h2>
          <p className="text-gray-600">Register a new medication in the system</p>
        </div>
      </div>

      {createMedicationMutation.isError && (
        <Alert variant="error" title="Error Creating Medication" className="mb-6">
          {createMedicationMutation.error?.message || 'Failed to create medication. Please try again.'}
        </Alert>
      )}

      {createMedicationMutation.isSuccess && (
        <Alert variant="success" title="Medication Created Successfully" className="mb-6">
          The medication has been added to the system and is now available for patient assignments.
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={medicationValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form className="space-y-6">
            <Input
              label="Medication Name"
              name="name"
              type="text"
              placeholder="e.g., Aspirin, Ibuprofen"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name ? errors.name : undefined}
              required
              leftIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              }
            />

            <Input
              label="Dosage"
              name="dosage"
              type="text"
              placeholder="e.g., 100mg, 2 tablets"
              value={values.dosage}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dosage && errors.dosage ? errors.dosage : undefined}
              required
              leftIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
            />

            <Input
              label="Frequency"
              name="frequency"
              type="text"
              placeholder="e.g., Once daily, Twice a day"
              value={values.frequency}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.frequency && errors.frequency ? errors.frequency : undefined}
              required
              helpText="Specify how often the medication should be taken"
              leftIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <Button
              type="submit"
              size="lg"
              className="w-full"
              variant="success"
              isLoading={isSubmitting || createMedicationMutation.isPending}
              leftIcon={
                !isSubmitting && !createMedicationMutation.isPending ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                ) : undefined
              }
            >
              {isSubmitting || createMedicationMutation.isPending ? 'Creating Medication...' : 'Create Medication'}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
} 