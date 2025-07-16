'use client';

import { useState } from 'react';
import { useCreateMedication } from '../hooks/useQueries';
import { CreateMedicationDto } from '../types';

export default function MedicationForm() {
  const [formData, setFormData] = useState<CreateMedicationDto>({
    name: '',
    dosage: '',
    frequency: '',
  });
  const [errors, setErrors] = useState<Partial<CreateMedicationDto>>({});

  const createMedicationMutation = useCreateMedication();

  const handleInputChange = (field: keyof CreateMedicationDto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateMedicationDto> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Medication name is required';
    }

    if (!formData.dosage.trim()) {
      newErrors.dosage = 'Dosage is required';
    }

    if (!formData.frequency.trim()) {
      newErrors.frequency = 'Frequency is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await createMedicationMutation.mutateAsync(formData);
      setFormData({ name: '', dosage: '', frequency: '' });
      setErrors({});
    } catch (error) {
      console.error('Error creating medication:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <span className="text-blue-500 mr-3 text-2xl">💊</span>
        <h2 className="text-2xl font-bold">Add New Medication</h2>
      </div>

      {createMedicationMutation.isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {createMedicationMutation.error?.message || 'Failed to create medication'}
        </div>
      )}

      {createMedicationMutation.isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Medication created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Medication Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., Aspirin"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-2">
            Dosage *
          </label>
          <input
            type="text"
            id="dosage"
            value={formData.dosage}
            onChange={(e) => handleInputChange('dosage', e.target.value)}
            placeholder="e.g., 100mg"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dosage ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.dosage && (
            <p className="mt-1 text-sm text-red-600">{errors.dosage}</p>
          )}
        </div>

        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-2">
            Frequency *
          </label>
          <input
            type="text"
            id="frequency"
            value={formData.frequency}
            onChange={(e) => handleInputChange('frequency', e.target.value)}
            placeholder="e.g., Once daily"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.frequency ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.frequency && (
            <p className="mt-1 text-sm text-red-600">{errors.frequency}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={createMedicationMutation.isPending}
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            createMedicationMutation.isPending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {createMedicationMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating...
            </>
          ) : (
            <>
              💾 Create Medication
            </>
          )}
        </button>
      </form>
    </div>
  );
} 