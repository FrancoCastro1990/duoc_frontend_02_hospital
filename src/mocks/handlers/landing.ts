import { http, HttpResponse } from 'msw';
import type {
  DashboardData,
  DashboardStatistics,
  FeatureHighlight,
  QuickAction,
} from '@/features/landing/types';

/**
 * Mock Dashboard Statistics
 */
const mockStatistics: DashboardStatistics = {
  totalPatients: 1247,
};

/**
 * Mock Feature Highlights
 */
const mockFeatures: FeatureHighlight[] = [
  {
    id: 'patient-management',
    title: 'Patient Management',
    description:
      'Efficiently manage patient records, medical history, and treatment plans in one centralized system.',
    icon: 'Users',
  },
];

/**
 * Mock Quick Actions
 */
const mockQuickActions: QuickAction[] = [
  {
    id: 'view-patients',
    label: 'View Patients',
    variant: 'primary',
    path: '/patients',
  },
];

/**
 * Landing API Handlers
 * Defines mock endpoints for dashboard/landing page requests
 */
export const landingHandlers = [
  // GET /api/dashboard - Get all dashboard data
  http.get('/api/dashboard', async () => {
    // Simulate network delay (like the current service)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const dashboardData: DashboardData = {
      statistics: mockStatistics,
      features: mockFeatures,
      quickActions: mockQuickActions,
    };

    return HttpResponse.json<DashboardData>(dashboardData);
  }),

  // GET /api/dashboard/statistics - Get only statistics
  http.get('/api/dashboard/statistics', async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return HttpResponse.json<DashboardStatistics>(mockStatistics);
  }),

  // GET /api/dashboard/features - Get only features
  http.get('/api/dashboard/features', async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return HttpResponse.json<FeatureHighlight[]>(mockFeatures);
  }),

  // GET /api/dashboard/quick-actions - Get only quick actions
  http.get('/api/dashboard/quick-actions', async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return HttpResponse.json<QuickAction[]>(mockQuickActions);
  }),
];
