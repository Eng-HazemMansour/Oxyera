'use client';

import { useState } from 'react';
import { usePatients, useAssignmentsWithRemainingDays } from '../hooks/useQueries';
import PatientForm from '../components/PatientForm';
import MedicationForm from '../components/MedicationForm';
import AssignmentForm from '../components/AssignmentForm';
import { Card } from '../components/ui';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'patients', label: 'Add Patient', icon: '👤' },
  { id: 'medications', label: 'Add Medication', icon: '💊' },
  { id: 'assignments', label: 'Assign Medication', icon: '🔗' }
];

interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
  activeTab: string;
}

function TabPanel({ children, value, activeTab }: TabPanelProps) {
  return (
    <div className={`${activeTab === value ? 'block animate-fade-in' : 'hidden'}`}>
      {children}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    red: 'bg-red-50 text-red-600 border-red-200'
  };

  return (
    <Card variant="bordered" className="hover:shadow-lg transition-all duration-200">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </Card>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { data: patients, isLoading: patientsLoading, error: patientsError } = usePatients();
  const { data: assignments, isLoading: assignmentsLoading, error: assignmentsError } = useAssignmentsWithRemainingDays();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRemainingDaysInfo = (days: number) => {
    if (days === 0) return { color: 'red', label: 'Expires today' };
    if (days <= 3) return { color: 'yellow', label: `${days} days left` };
    return { color: 'green', label: `${days} days left` };
  };

  const getStatsData = () => {
    const totalPatients = patients?.length || 0;
    const activeAssignments = assignments?.length || 0;
    const expiringToday = assignments?.filter(a => a.remainingDays !== undefined && a.remainingDays === 0).length || 0;
    const expiringSoon = assignments?.filter(a => a.remainingDays !== undefined && a.remainingDays <= 3 && a.remainingDays > 0).length || 0;

    return { totalPatients, activeAssignments, expiringToday, expiringSoon };
  };

  if (patientsLoading || assignmentsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading healthcare data...</p>
        </div>
      </div>
    );
  }

  if (patientsError || assignmentsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto pt-20">
          <Card variant="bordered" className="border-red-200">
            <div className="text-center py-8">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Data</h2>
              <p className="text-gray-600">
                {patientsError?.message || assignmentsError?.message}
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const stats = getStatsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Healthcare Management System
            </h1>
            <p className="text-lg text-gray-600">
              Manage patients, medications, and treatment schedules
            </p>
          </div>
        </header>
        
        <nav className="mb-8">
          <Card padding="none" variant="bordered" className="overflow-hidden">
            <div className="flex flex-wrap">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-0 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </nav>

        <main>
          <TabPanel value="dashboard" activeTab={activeTab}>
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  title="Total Patients" 
                  value={stats.totalPatients} 
                  icon="👥" 
                  color="blue"
                />
                <StatCard 
                  title="Active Treatments" 
                  value={stats.activeAssignments} 
                  icon="💊" 
                  color="green"
                />
                <StatCard 
                  title="Expiring Today" 
                  value={stats.expiringToday} 
                  icon="⚠️" 
                  color="red"
                />
                <StatCard 
                  title="Expiring Soon" 
                  value={stats.expiringSoon} 
                  icon="🕐" 
                  color="yellow"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Overview</h2>
                
                {patients && patients.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {patients.map((patient) => (
                      <Card key={patient.id} variant="elevated" className="hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <span className="text-blue-600 text-xl">👤</span>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                              <p className="text-sm text-gray-500">
                                Born: {formatDate(patient.dateOfBirth.toString())}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Active Treatments</h4>
                          
                          {patient.assignments && patient.assignments.length > 0 ? (
                            <div className="space-y-3">
                              {patient.assignments.map((assignment) => {
                                const assignmentData = assignments?.find(a => a.id === assignment.id);
                                const remainingDays = assignmentData?.remainingDays || 0;
                                const dayInfo = getRemainingDaysInfo(remainingDays);
                                
                                return (
                                  <div key={assignment.id} className="bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-900">
                                          {assignment.medication?.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          {assignment.medication?.dosage} • {assignment.medication?.frequency}
                                        </p>
                                      </div>
                                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                                        dayInfo.color === 'red' 
                                          ? 'bg-red-100 text-red-800'
                                          : dayInfo.color === 'yellow'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-green-100 text-green-800'
                                      }`}>
                                        {dayInfo.label}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-6 text-gray-500">
                              <div className="text-3xl mb-2">💊</div>
                              <p className="text-sm">No active treatments</p>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card variant="bordered" className="border-blue-200">
                    <div className="text-center py-12">
                      <div className="text-blue-500 text-4xl mb-4">👥</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No patients yet</h3>
                      <p className="text-gray-600 mb-4">Start by adding your first patient to the system.</p>
                      <button
                        onClick={() => setActiveTab('patients')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Add First Patient
                      </button>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </TabPanel>

          <TabPanel value="patients" activeTab={activeTab}>
            <div className="max-w-2xl mx-auto">
              <PatientForm />
            </div>
          </TabPanel>

          <TabPanel value="medications" activeTab={activeTab}>
            <div className="max-w-2xl mx-auto">
              <MedicationForm />
            </div>
          </TabPanel>

          <TabPanel value="assignments" activeTab={activeTab}>
            <div className="max-w-2xl mx-auto">
              <AssignmentForm />
            </div>
          </TabPanel>
        </main>
      </div>
    </div>
  );
}
