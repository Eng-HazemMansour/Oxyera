'use client';

import { useState } from 'react';
import { useCreateAssignment, usePatients, useMedications } from '../hooks/useQueries';
import { CreateAssignmentDto } from '../types';

export default function AssignmentForm() {
  const [formData, setFormData] = useState<CreateAssignmentDto>({
    patientId: 0,
    medicationId: 0,
    startDate: '',
    days: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateAssignmentDto, string>>>({});

  const createAssignmentMutation = useCreateAssignment();
  const { data: patients } = usePatients();
  const { data: medications } = useMedications();

  const handleInputChange = (field: keyof CreateAssignmentDto, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateAssignmentDto, string>> = {};

    if (!formData.patientId) {
      newErrors.patientId = 'Patient is required';
    }

    if (!formData.medicationId) {
      newErrors.medicationId = 'Medication is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.days || formData.days <= 0) {
      newErrors.days = 'Days must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await createAssignmentMutation.mutateAsync(formData);
      setFormData({ patientId: 0, medicationId: 0, startDate: '', days: 0 });
      setErrors({});
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <span className="text-blue-500 mr-3 text-2xl">📋</span>
        <h2 className="text-2xl font-bold">Assign Medication to Patient</h2>
      </div>

      {createAssignmentMutation.isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {createAssignmentMutation.error?.message || 'Failed to create assignment'}
        </div>
      )}

      {createAssignmentMutation.isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Medication assigned successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
            Patient *
          </label>
          <select
            id="patientId"
            value={formData.patientId}
            onChange={(e) => handleInputChange('patientId', parseInt(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.patientId ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value={0}>Select a patient...</option>
            {patients?.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          {errors.patientId && (
            <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>
          )}
        </div>

        <div>
          <label htmlFor="medicationId" className="block text-sm font-medium text-gray-700 mb-2">
            Medication *
          </label>
          <select
            id="medicationId"
            value={formData.medicationId}
            onChange={(e) => handleInputChange('medicationId', parseInt(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.medicationId ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value={0}>Select a medication...</option>
            {medications?.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.name} - {medication.dosage}
              </option>
            ))}
          </select>
          {errors.medicationId && (
            <p className="mt-1 text-sm text-red-600">{errors.medicationId}</p>
          )}
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Start Date *
          </label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Days *
          </label>
          <input
            type="number"
            id="days"
            value={formData.days}
            onChange={(e) => handleInputChange('days', parseInt(e.target.value) || 0)}
            min="1"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.days ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.days && (
            <p className="mt-1 text-sm text-red-600">{errors.days}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={createAssignmentMutation.isPending}
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            createAssignmentMutation.isPending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {createAssignmentMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating...
            </>
          ) : (
            <>
              💾 Assign Medication
            </>
          )}
        </button>
      </form>
    </div>
  );
} 