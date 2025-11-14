/**
 * Patients Feature
 * Patient management module for the Hospital Dashboard
 *
 * This feature provides patient data management, including:
 * - Patient listing and overview
 * - Patient status tracking (admitted/discharged)
 * - Patient information display
 */

// Page Components
export { Patients } from './pages/Patients';

// Hooks
export { usePatients } from './hooks/usePatients';

// Services
export { PatientsService } from './services/PatientsService';

// React Query (TanStack Query)
export { patientsKeys } from './queries/keys';
export { createPatientsQueryOptions } from './queries/options';

// Types
export type { Patient, IPatientsService } from './types';

// Components
export { PatientStatCard, LoadingState, SearchBar } from './components';

// Utilities
export { formatDate } from './utils/formatters';
