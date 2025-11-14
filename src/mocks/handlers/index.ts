/**
 * MSW Request Handlers
 * Combines all domain-specific handlers into a single array
 */
import { patientsHandlers } from './patients';
import { landingHandlers } from './landing';

/**
 * All request handlers for the application
 * These handlers will intercept HTTP requests and return mock responses
 */
export const handlers = [...patientsHandlers, ...landingHandlers];
