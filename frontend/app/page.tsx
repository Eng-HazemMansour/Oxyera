'use client';

import { useState } from 'react';
import { usePatients, useAssignmentsWithRemainingDays } from '../hooks/useQueries';
import PatientForm from '../components/PatientForm';
import MedicationForm from '../components/MedicationForm';
import AssignmentForm from '../components/AssignmentForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div className={`${value === index ? 'block' : 'hidden'}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const [tabValue, setTabValue] = useState(0);
  const { data: patients, isLoading: patientsLoading, error: patientsError } = usePatients();
  const { data: assignments, isLoading: assignmentsLoading, error: assignmentsError } = useAssignmentsWithRemainingDays();

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getRemainingDaysColor = (days: number) => {
    if (days === 0) return 'bg-red-100 text-red-800';
    if (days <= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  if (patientsLoading || assignmentsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (patientsError || assignmentsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading data: {patientsError?.message || assignmentsError?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Healthcare Management System
      </h1>
      
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => handleTabChange(0)}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              tabValue === 0
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => handleTabChange(1)}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              tabValue === 1
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            👤 Add Patient
          </button>
          <button
            onClick={() => handleTabChange(2)}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              tabValue === 2
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            💊 Add Medication
          </button>
          <button
            onClick={() => handleTabChange(3)}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              tabValue === 3
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            ➕ Assign Medication
          </button>
        </nav>
      </div>

      <TabPanel value={tabValue} index={0}>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Patient Dashboard</h2>
          
          {patients && patients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.map((patient) => (
                <div key={patient.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-blue-500 mr-2">👤</span>
                    <h3 className="text-xl font-semibold">{patient.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Born: {formatDate(patient.dateOfBirth.toString())}
                  </p>

                  <h4 className="text-lg font-medium mb-3">Active Treatments</h4>

                  {patient.assignments && patient.assignments.length > 0 ? (
                    <div className="space-y-2">
                      {patient.assignments.map((assignment) => {
                        const remainingDays = assignments?.find(a => a.id === assignment.id)?.remainingDays || 0;
                        return (
                          <div key={assignment.id} className="border-b pb-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{assignment.medication?.name}</p>
                                <p className="text-sm text-gray-600">
                                  {assignment.medication?.dosage} - {assignment.medication?.frequency}
                                </p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRemainingDaysColor(remainingDays)}`}>
                                {remainingDays} days left
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500">No active treatments</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
              No patients found. Add a patient to get started.
            </div>
          )}
        </div>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <PatientForm />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <MedicationForm />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <AssignmentForm />
      </TabPanel>
    </div>
  );
}
