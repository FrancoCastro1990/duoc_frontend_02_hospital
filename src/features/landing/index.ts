/**
 * Landing Feature Module
 *
 * This module provides the Landing page functionality for the Hospital Dashboard.
 * It includes the main landing page component with hero section, feature showcase,
 * statistics dashboard, and quick action buttons.
 *
 * @module features/landing
 *
 * ## Architecture
 * Following Screaming Architecture principles, this feature module contains:
 * - pages/: Page-level components (Landing)
 * - hooks/: Custom hooks for business logic (useLanding)
 * - services/: Service layer for data operations (LandingService)
 * - types/: Type definitions and interfaces
 * - components/: Feature-specific presentational components
 * - utils/: Utility functions
 *
 * ## Usage
 * ```typescript
 * import { Landing, useLanding, LandingService } from '@/features/landing';
 * ```
 *
 * ## Exports
 * - Landing: Main landing page component
 * - useLanding: Custom hook for landing page business logic
 * - LandingService: Service class for dashboard data operations
 * - Types: All type definitions and interfaces
 * - Components: Feature-specific components (optional, for internal use)
 */

// Page Components
export { Landing } from './pages/Landing';

// Custom Hooks
export { useLanding } from './hooks/useLanding';

// Services
export { LandingService } from './services/LandingService';

// React Query (TanStack Query)
export { landingKeys } from './queries/keys';
export { createLandingQueryOptions } from './queries/options';

// Types - Export all types from types folder
export type {
  DashboardStatistics,
  FeatureHighlight,
  QuickAction,
  DashboardData,
  ILandingService,
  UseLandingReturn,
  LandingProps,
  FeatureCardProps,
  StatisticCardProps,
  QuickActionButtonProps,
} from './types';

// Components - Export for potential reuse (optional)
export { FeatureCard, StatisticCard, QuickActionButton } from './components';
