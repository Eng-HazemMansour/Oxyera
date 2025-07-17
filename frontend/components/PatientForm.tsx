'use client';

import { Formik, Form } from 'formik';
import { useCreatePatient } from '../hooks/useQueries';
import { CreatePatientDto } from '../types';
import { patientValidationSchema } from '../lib/validationSchemas';
import { Card, Input, Button, Alert } from './ui';

const initialValues: CreatePatientDto = {
  name: '',
  dateOfBirth: '',
};

export default function PatientForm() {
  const createPatientMutation = useCreatePatient();

  const handleSubmit = async (values: CreatePatientDto, { resetForm }: { resetForm: () => void }) => {
    try {
      await createPatientMutation.mutateAsync(values);
      resetForm();
    } catch (_error) {
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Card variant="elevated" className="animate-slide-up">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <span className="text-blue-600 text-2xl">👤</span>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
          <p className="text-gray-600">Enter patient information to create a new record</p>
        </div>
      </div>

      {createPatientMutation.isError && (
        <Alert variant="error" title="Error Creating Patient" className="mb-6">
          {createPatientMutation.error?.message || 'Failed to create patient. Please try again.'}
        </Alert>
      )}

      {createPatientMutation.isSuccess && (
        <Alert variant="success" title="Patient Created Successfully" className="mb-6">
          The patient has been added to the system and is now available for medication assignments.
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={patientValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form className="space-y-6">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter patient's full name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name ? errors.name : undefined}
              required
              leftIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : undefined}
              max={getTodayDate()}
              required
              helpText="Select the patient's date of birth"
              leftIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />

            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isSubmitting || createPatientMutation.isPending}
              leftIcon={
                !isSubmitting && !createPatientMutation.isPending ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                ) : undefined
              }
            >
              {isSubmitting || createPatientMutation.isPending ? 'Creating Patient...' : 'Create Patient'}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
} 