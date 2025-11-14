import type { DashboardData, ILandingService } from '../types';

/**
 * LandingService Class
 * Handles dashboard data operations via HTTP requests
 * In development: MSW intercepts requests and returns mock data
 * In production: Real API endpoints will be called
 */
export class LandingService implements ILandingService {
  /**
   * Retrieves all dashboard data (statistics, features, quick actions)
   * Makes a real HTTP GET request to /api/dashboard
   * MSW will intercept this in development mode
   *
   * @returns {Promise<DashboardData>} Complete dashboard data
   */
  async getDashboardData(): Promise<DashboardData> {
    const response = await fetch('/api/dashboard');

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
    }

    return response.json();
  }
}

export default LandingService;
