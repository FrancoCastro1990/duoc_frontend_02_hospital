/**
 * Icon Mapper Utility
 * Maps icon name strings to lucide-react icon components
 */
import { Users, Calendar, FileText, Stethoscope } from 'lucide-react';
import type { ComponentType } from 'react';

/**
 * Maps icon name string to actual lucide-react icon component
 *
 * @param {string} iconName - The name of the icon to retrieve
 * @returns {ComponentType} The corresponding icon component, defaults to Users if not found
 */
export const getIconComponent = (iconName: string): ComponentType<{ className?: string }> => {
  const iconMap: Record<string, ComponentType<{ className?: string }>> = {
    Users,
    Calendar,
    FileText,
    Stethoscope,
  };
  return iconMap[iconName] || Users;
};
