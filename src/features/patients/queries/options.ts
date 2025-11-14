import { queryOptions } from '@tanstack/react-query';
import { patientsKeys } from './keys';
import type { IPatientsService } from '../types';

/**
 * Patients Query Options Factory
 * Creates query options for patient-related queries with dependency injection
 *
 * @param service - PatientsService instance (injected)
 * @returns Query options object with full type inference
 */
export const createPatientsQueryOptions = (service: IPatientsService) => ({
  /**
   * All patients query
   * Used in main Patients page for displaying patient list
   */
  all: () =>
    queryOptions({
      queryKey: patientsKeys.all,
      queryFn: () => service.getAllPatients(),
      staleTime: 1000 * 60 * 5, // 5 minutes - patient data changes slowly
    }),

  /**
   * Single patient query (future use)
   * Used in patient detail pages
   */
  detail: (id: string) =>
    queryOptions({
      queryKey: patientsKeys.detail(id),
      queryFn: () => service.getAllPatients().then((patients) => patients.find((p) => p.id === id)),
      enabled: !!id, // Only run if ID exists
    }),
});
