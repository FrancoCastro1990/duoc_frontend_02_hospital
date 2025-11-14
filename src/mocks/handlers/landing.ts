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
  todaysAppointments: 38,
  activeStaff: 156,
  emergencyCases: 4,
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
  {
    id: 'appointments',
    title: 'Appointments',
    description:
      'Schedule, track, and manage patient appointments with automated reminders and notifications.',
    icon: 'Calendar',
  },
  {
    id: 'medical-records',
    title: 'Medical Records',
    description:
      'Secure digital access to comprehensive medical records, lab results, and diagnostic reports.',
    icon: 'FileText',
  },
  {
    id: 'staff-directory',
    title: 'Staff Directory',
    description:
      'Access complete staff information including specializations, schedules, and contact details.',
    icon: 'Stethoscope',
  },
];

/**
 * Mock Quick Actions
 */
const mockQuickActions: QuickAction[] = [
  {
    id: 'schedule-appointment',
    label: 'Schedule Appointment',
    variant: 'primary',
  },
  {
    id: 'view-patients',
    label: 'View Patients',
    variant: 'secondary',
  },
  {
    id: 'emergency',
    label: 'Emergency',
    variant: 'danger',
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
