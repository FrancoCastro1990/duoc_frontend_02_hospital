/**
 * Date Formatting Utilities
 * Reusable date formatting functions for the Patients feature
 */

/**
 * Formats an ISO date string to a readable format
 * @param isoDate - ISO date string
 * @param options - Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string (e.g., "Jan 15, 2025")
 */
export const formatDate = (
  isoDate: string,
  options?: Intl.DateTimeFormatOptions
): string => {
  const date = new Date(isoDate);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options || defaultOptions);
};
