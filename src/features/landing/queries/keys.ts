/**
 * Landing/Dashboard Query Keys Factory
 * Hierarchical query keys for cache management and invalidation
 */
export const landingKeys = {
  // Base key - invalidating this invalidates ALL dashboard queries
  all: ['dashboard'] as const,

  // Dashboard data
  data: () => [...landingKeys.all, 'data'] as const,

  // Statistics (future - if we want separate query)
  statistics: () => [...landingKeys.all, 'statistics'] as const,

  // Features (future - if we want separate query)
  features: () => [...landingKeys.all, 'features'] as const,

  // Quick actions (future - if we want separate query)
  quickActions: () => [...landingKeys.all, 'quick-actions'] as const,
} as const;
