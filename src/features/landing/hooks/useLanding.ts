import { useState, useEffect } from 'react';
import type {
  DashboardStatistics,
  FeatureHighlight,
  QuickAction,
  ILandingService,
  UseLandingReturn,
} from '../types';

/**
 * Custom hook for Landing feature business logic
 * Manages dashboard statistics, features, and quick actions using dependency injection
 *
 * @param {ILandingService} service - The landing service instance for data operations (required)
 * @returns {UseLandingReturn} Landing page state and methods
 */
export const useLanding = (service: ILandingService): UseLandingReturn => {
  const [statistics, setStatistics] = useState<DashboardStatistics>({
    totalPatients: 0,
    todaysAppointments: 0,
    activeStaff: 0,
    emergencyCases: 0,
  });

  const [features, setFeatures] = useState<FeatureHighlight[]>([]);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches dashboard data from the service
   * Loads statistics, features, and quick actions
   */
  const fetchDashboardData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const dashboardData = await service.getDashboardData();

      setStatistics(dashboardData.statistics);
      setFeatures(dashboardData.features);
      setQuickActions(dashboardData.quickActions);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refreshes dashboard data
   * Can be called manually by the user
   */
  const refreshStatistics = async (): Promise<void> => {
    await fetchDashboardData();
  };

  /**
   * Load dashboard data on component mount
   */
  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    statistics,
    features,
    quickActions,
    isLoading,
    error,
    refreshStatistics,
  };
};
