import type {
  DashboardData,
  ILandingService,
  DashboardStatistics,
  FeatureHighlight,
  QuickAction,
} from '../types';

/**
 * LandingService Class
 * Provides dashboard data for the hospital landing page
 * In production, this would fetch data from a real API
 */
export class LandingService implements ILandingService {
  /**
   * Retrieves all dashboard data (statistics, features, quick actions)
   * Simulates async API call with delay
   *
   * @returns {Promise<DashboardData>} Complete dashboard data
   */
  async getDashboardData(): Promise<DashboardData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const statistics: DashboardStatistics = {
      totalPatients: 1247,
      todaysAppointments: 38,
      activeStaff: 156,
      emergencyCases: 4,
    };

    const features: FeatureHighlight[] = [
      {
        id: 'patient-management',
        title: 'Patient Management',
        description: 'Efficiently manage patient records, medical history, and treatment plans in one centralized system.',
        icon: 'Users',
      },
      {
        id: 'appointments',
        title: 'Appointments',
        description: 'Schedule, track, and manage patient appointments with automated reminders and notifications.',
        icon: 'Calendar',
      },
      {
        id: 'medical-records',
        title: 'Medical Records',
        description: 'Secure digital access to comprehensive medical records, lab results, and diagnostic reports.',
        icon: 'FileText',
      },
      {
        id: 'staff-directory',
        title: 'Staff Directory',
        description: 'Access complete staff information including specializations, schedules, and contact details.',
        icon: 'Stethoscope',
      },
    ];

    const quickActions: QuickAction[] = [
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

    return {
      statistics,
      features,
      quickActions,
    };
  }
}

export default LandingService;
