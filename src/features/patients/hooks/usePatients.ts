import { useState, useEffect } from 'react';
import type { Patient, IPatientsService } from '../types';

/**
 * usePatients Hook
 * Manages patient data fetching and state with dependency injection
 *
 * @param {IPatientsService} service - PatientsService instance (required)
 * @returns {object} Object containing patients array and loading state
 */
export const usePatients = (service: IPatientsService) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await service.getAllPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [service]);

  return {
    patients,
    loading,
  };
};
