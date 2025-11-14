import { queryOptions } from '@tanstack/react-query';
import { landingKeys } from './keys';
import type { ILandingService } from '../types';

/**
 * Landing/Dashboard Query Options Factory
 * Creates query options for dashboard-related queries with dependency injection
 *
 * @param service - LandingService instance (injected)
 * @returns Query options object with full type inference
 */
export const createLandingQueryOptions = (service: ILandingService) => ({
  /**
   * Dashboard data query
   * Fetches statistics, features, and quick actions in a single request
   */
  dashboard: () =>
    queryOptions({
      queryKey: landingKeys.data(),
      queryFn: () => service.getDashboardData(),
      staleTime: 1000 * 60 * 5, // 5 minutes - dashboard data changes slowly
    }),
});
