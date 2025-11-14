import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createPatientsQueryOptions } from '../queries/options';
import type { IPatientsService } from '../types';

/**
 * usePatients Hook
 * Manages patient data fetching, search state, and filtering with dependency injection
 * Now powered by React Query for automatic caching, background refetching, and request deduplication
 *
 * @param {IPatientsService} service - PatientsService instance (required)
 * @returns {object} Object containing patients array, loading state, search functionality, and filtered results
 */
export const usePatients = (service: IPatientsService) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // React Query handles data fetching, caching, loading, and error states automatically
  const patientsQueries = createPatientsQueryOptions(service);
  const { data: patients = [], isLoading } = useQuery(patientsQueries.all());

  // Client-side filtering (preserves current search behavior)
  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) {
      return patients;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(lowerSearchTerm) ||
        patient.dni.includes(searchTerm)
    );
  }, [patients, searchTerm]);

  // Public API (unchanged - component doesn't need modifications)
  return {
    patients,
    loading: isLoading,
    searchTerm,
    setSearchTerm,
    filteredPatients,
  };
};
