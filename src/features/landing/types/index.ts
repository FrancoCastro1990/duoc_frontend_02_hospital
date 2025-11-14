/**
 * Landing Feature - Type Definitions
 * Central location for all types, interfaces, and type contracts
 */

/**
 * Dashboard Statistics Interface
 * Statistics data for the hospital dashboard
 */
export interface DashboardStatistics {
  totalPatients: number;
}

/**
 * Feature Highlight Interface
 * Feature highlight for the landing page
 */
export interface FeatureHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

/**
 * Quick Action Interface
 * Quick action item for the landing page
 */
export interface QuickAction {
  id: string;
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  path?: string; // Optional navigation path
}

/**
 * Dashboard Data Interface
 * Contains all data needed for the landing page dashboard
 */
export interface DashboardData {
  statistics: DashboardStatistics;
  features: FeatureHighlight[];
  quickActions: QuickAction[];
}

/**
 * LandingService Interface
 * Defines the contract for landing page data operations
 */
export interface ILandingService {
  getDashboardData(): Promise<DashboardData>;
}

/**
 * Return type for the useLanding hook
 */
export interface UseLandingReturn {
  statistics: DashboardStatistics;
  features: FeatureHighlight[];
  quickActions: QuickAction[];
  isLoading: boolean;
  error: string | null;
  refreshStatistics: () => Promise<void>;
}

/**
 * Landing Page Component Props
 */
export interface LandingProps {
  className?: string;
}

/**
 * Feature Card Component Props
 */
export interface FeatureCardProps {
  feature: FeatureHighlight;
  index: number;
}

/**
 * Statistic Card Component Props
 */
export interface StatisticCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  testId: string;
  delay?: number;
  isLoading?: boolean;
}

/**
 * Quick Action Button Component Props
 */
export interface QuickActionButtonProps {
  action: QuickAction;
}
