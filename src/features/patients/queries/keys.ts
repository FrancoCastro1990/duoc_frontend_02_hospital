/**
 * Patients Query Keys Factory
 * Hierarchical query keys for cache management and invalidation
 *
 * Pattern: Most generic → most specific
 * Example: ['patients'] → ['patients', 'list'] → ['patients', 'list', { search: 'john' }]
 */
export const patientsKeys = {
  // Base key - invalidating this invalidates ALL patient queries
  all: ['patients'] as const,

  // Lists
  lists: () => [...patientsKeys.all, 'list'] as const,
  list: (filters?: string) => [...patientsKeys.lists(), { filters }] as const,

  // Details
  details: () => [...patientsKeys.all, 'detail'] as const,
  detail: (id: string) => [...patientsKeys.details(), id] as const,

  // Statistics
  stats: () => [...patientsKeys.all, 'stats'] as const,
} as const;
