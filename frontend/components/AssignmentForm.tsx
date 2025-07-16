'use client';

import { Formik, Form } from 'formik';
import { useCreateAssignment, usePatients, useMedications } from '../hooks/useQueries';
import { CreateAssignmentDto } from '../types';
import { assignmentValidationSchema } from '../lib/validationSchemas';
import { Card, Input, Select, Button, Alert } from './ui';

interface AssignmentFormValues {
  patientId: number | '';
  medicationId: number | '';
  startDate: string;
  days: number | '';
}

const initialValues: AssignmentFormValues = {
  patientId: '',
  medicationId: '',
  startDate: '',
  days: '',
};

export default function AssignmentForm() {
  const createAssignmentMutation = useCreateAssignment();
  const { data: patients, isLoading: patientsLoading } = usePatients();
  const { data: medications, isLoading: medicationsLoading } = useMedications();

  const handleSubmit = async (values: AssignmentFormValues, { resetForm }: { resetForm: () => void }) => {
    try {
      const submitData: CreateAssignmentDto = {
        patientId: Number(values.patientId),
        medicationId: Number(values.medicationId),
        startDate: values.startDate,
        days: Number(values.days),
      };
      await createAssignmentMutation.mutateAsync(submitData);
      resetForm();
    } catch (_error) {
    }
  };

  const patientOptions = patients?.map(patient => ({
    value: patient.id,
    label: patient.name
  })) || [];

  const medicationOptions = medications?.map(medication => ({
    value: medication.id,
    label: `${medication.name} - ${medication.dosage}`
  })) || [];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (patientsLoading || medicationsLoading) {
    return (
      <Card variant="elevated" className="animate-slide-up">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mr-3"></div>
          <span className="text-gray-600">Loading patients and medications...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="animate-slide-up">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-purple-100 rounded-lg">
          <span className="text-purple-600 text-2xl">🔗</span>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-900">Assign Medication</h2>
          <p className="text-gray-600">Create a new treatment assignment for a patient</p>
        </div>
      </div>

      {createAssignmentMutation.isError && (
        <Alert variant="error" title="Error Creating Assignment" className="mb-6">
          {createAssignmentMutation.error?.message || 'Failed to create assignment. Please try again.'}
        </Alert>
      )}

      {createAssignmentMutation.isSuccess && (
        <Alert variant="success" title="Assignment Created Successfully" className="mb-6">
          The medication has been successfully assigned to the patient.
        </Alert>
      )}

      {patientOptions.length === 0 && (
        <Alert variant="warning" title="No Patients Available" className="mb-6">
          You need to add patients before creating assignments. Please add a patient first.
        </Alert>
      )}

      {medicationOptions.length === 0 && (
        <Alert variant="warning" title="No Medications Available" className="mb-6">
          You need to add medications before creating assignments. Please add a medication first.
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={assignmentValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <Select
              label="Patient"
              name="patientId"
              options={patientOptions}
              placeholder="Select a patient..."
              value={values.patientId}
              onChange={(e) => setFieldValue('patientId', e.target.value ? parseInt(e.target.value) : '')}
              onBlur={handleBlur}
              error={touched.patientId && errors.patientId ? errors.patientId : undefined}
              required
              disabled={patientOptions.length === 0}
            />

            <Select
              label="Medication"
              name="medicationId"
              options={medicationOptions}
              placeholder="Select a medication..."
              value={values.medicationId}
              onChange={(e) => setFieldValue('medicationId', e.target.value ? parseInt(e.target.value) : '')}
              onBlur={handleBlur}
              error={touched.medicationId && errors.medicationId ? errors.medicationId : undefined}
              required
              disabled={medicationOptions.length === 0}
            />

            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={values.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.startDate && errors.startDate ? errors.startDate : undefined}
              min={getTodayDate()}
              required
              helpText="When should the treatment begin?"
              leftIcon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />

            <Input
              label="Treatment Duration"
              name="days"
              type="number"
              placeholder="Enter number of days"
              value={values.days || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.days && errors.days ? errors.days : undefined}
              min="1"
              max="365"
              required
              helpText="How many days should this treatment last?"
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
              variant="primary"
              isLoading={isSubmitting || createAssignmentMutation.isPending}
              disabled={patientOptions.length === 0 || medicationOptions.length === 0}
              leftIcon={
                !isSubmitting && !createAssignmentMutation.isPending ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                ) : undefined
              }
            >
              {isSubmitting || createAssignmentMutation.isPending ? 'Creating Assignment...' : 'Create Assignment'}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
} 