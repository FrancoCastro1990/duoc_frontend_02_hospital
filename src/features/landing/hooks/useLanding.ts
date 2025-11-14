import { useQuery } from '@tanstack/react-query';
import { createLandingQueryOptions } from '../queries/options';
import type {
  DashboardStatistics,
  ILandingService,
  UseLandingReturn,
} from '../types';

/**
 * Custom hook for Landing feature business logic
 * Manages dashboard statistics, features, and quick actions using dependency injection
 * Now powered by React Query for automatic caching, background refetching, and request deduplication
 *
 * @param {ILandingService} service - The landing service instance for data operations (required)
 * @returns {UseLandingReturn} Landing page state and methods
 */
export const useLanding = (service: ILandingService): UseLandingReturn => {
  // Default values for dashboard data
  const defaultStatistics: DashboardStatistics = {
    totalPatients: 0,
  };

  // React Query handles data fetching, caching, loading, and error states automatically
  const landingQueries = createLandingQueryOptions(service);
  const { data, isLoading, error, refetch } = useQuery(landingQueries.dashboard());

  // Wrapper function to match UseLandingReturn type signature
  const refreshStatistics = async (): Promise<void> => {
    await refetch();
  };

  // Public API (unchanged - component doesn't need modifications)
  return {
    statistics: data?.statistics ?? defaultStatistics,
    features: data?.features ?? [],
    quickActions: data?.quickActions ?? [],
    isLoading,
    error: error?.message ?? null,
    refreshStatistics,
  };
};
