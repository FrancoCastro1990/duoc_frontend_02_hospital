/**
 * Patients Feature - Type Definitions
 * Central location for all types, interfaces, and type contracts
 */

/**
 * Patient Interface
 * Represents a patient in the hospital system
 */
export interface Patient {
  id: string;
  name: string;
  dni: string;
  age: number;
  diagnostic: string;
  entryDate: string;
  departureDate: string | null;
}

/**
 * PatientsService Interface
 * Defines the contract for patient data operations
 */
export interface IPatientsService {
  getAllPatients(): Promise<Patient[]>;
}

/**
 * PatientStatCard Component Props
 * Props for the reusable patient statistics card component
 */
export interface PatientStatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  delay: number;
}

/**
 * LoadingState Component Props
 * Props for the loading state component
 */
export interface LoadingStateProps {
  message?: string;
}
