import React from 'react';
import { Users, Calendar, FileText } from 'lucide-react';
import { usePatients } from '../hooks/usePatients';
import { PatientsService } from '../services/PatientsService';
import type { Patient } from '../types';
import { formatDate } from '../utils/formatters';
import { PatientStatCard, LoadingState, SearchBar } from '../components';

// Create service instance
const patientsService = new PatientsService();

/**
 * Patients Component
 * Main page component that displays all patients in a professional table
 */
export const Patients: React.FC = () => {
  const { loading, searchTerm, setSearchTerm, filteredPatients } =
    usePatients(patientsService);

  if (loading) {
    return <LoadingState message="Please wait while we fetch the data..." />;
  }

  return (
    <div className="min-h-screen bg-primary-100 py-8 px-4 md:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Hero/Header Section */}
        <div className="mb-8 bg-gradient-secondary rounded-3xl p-8 md:p-12 shadow-md">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Patient Management
            </h1>
          </div>
          <p className="text-base md:text-lg text-white/90 max-w-3xl">
            Comprehensive overview of all registered patients in the hospital system
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <PatientStatCard
            icon={Users}
            label="Total Patients"
            value={filteredPatients.length}
            colorClass="text-secondary-600"
            bgClass="bg-secondary-50"
            borderClass="border-secondary-100"
            delay={0}
          />
          <PatientStatCard
            icon={Calendar}
            label="Currently Admitted"
            value={
              filteredPatients.filter((p) => p.departureDate === null).length
            }
            colorClass="text-accent-700"
            bgClass="bg-accent-50"
            borderClass="border-accent-200"
            delay={50}
          />
          <PatientStatCard
            icon={FileText}
            label="Discharged"
            value={
              filteredPatients.filter((p) => p.departureDate !== null).length
            }
            colorClass="text-neutral-600"
            bgClass="bg-neutral-50"
            borderClass="border-neutral-200"
            delay={100}
          />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by name or DNI..."
          />
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-secondary-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b-2 border-secondary-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 uppercase tracking-wide">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 uppercase tracking-wide">
                    DNI
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 uppercase tracking-wide">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 uppercase tracking-wide">
                    Diagnostic
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 uppercase tracking-wide">
                    Entry Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 uppercase tracking-wide">
                    Departure Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {filteredPatients.map((patient: Patient, index: number) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-secondary-50 transition-colors duration-200"
                    style={{ animationDelay: `${150 + index * 30}ms` }}
                  >
                    <td className="px-6 py-4 text-base font-semibold text-primary-900">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 text-base text-primary-700">
                      {patient.dni}
                    </td>
                    <td className="px-6 py-4 text-base text-primary-700">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 text-base text-primary-700">
                      {patient.diagnostic}
                    </td>
                    <td className="px-6 py-4 text-base text-primary-700">
                      {formatDate(patient.entryDate)}
                    </td>
                    <td className="px-6 py-4 text-base text-primary-700">
                      {patient.departureDate
                        ? formatDate(patient.departureDate)
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-base">
                      {patient.departureDate === null ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700 border border-accent-300">
                          Still Admitted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600 border border-neutral-300">
                          Discharged
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md border-2 border-secondary-100 text-center py-16 px-6">
            <div className="p-4 bg-secondary-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Users className="w-12 h-12 text-secondary-400" />
            </div>
            <p className="text-xl font-semibold text-primary-900 mb-2">
              {searchTerm ? 'No patients match your search' : 'No patients found'}
            </p>
            <p className="text-base text-primary-600">
              {searchTerm
                ? `Try adjusting your search term: "${searchTerm}"`
                : 'The patient list is currently empty'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
