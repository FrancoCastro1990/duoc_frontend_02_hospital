import React from "react";
import type { QuickActionButtonProps } from "../types";

/**
 * QuickActionButton Component
 * Displays a quick action button with variant-based styling
 * Supports primary, secondary, and danger variants
 */
export const QuickActionButton: React.FC<QuickActionButtonProps> = ({ action }) => {
  /**
   * Determines button styles based on variant
   * Primary: Lavender blue, Secondary: Sage green, Danger: Error red with pulse
   */
  const getButtonStyles = (): string => {
    switch (action.variant) {
      case "primary":
        return "bg-secondary-500 hover:bg-secondary-600 text-white shadow-md hover:shadow-lg";
      case "secondary":
        return "bg-accent-500 hover:bg-accent-600 text-white shadow-md hover:shadow-lg";
      case "danger":
        return "bg-error-500 hover:bg-error-600 text-white shadow-md hover:shadow-xl animate-pulse";
      default:
        return "bg-secondary-500 hover:bg-secondary-600 text-white shadow-md hover:shadow-lg";
    }
  };

  return (
    <button
      className={`px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold transition-all duration-200 ${getButtonStyles()}`}
      data-testid={`action-${action.id}`}
      onClick={() => console.log(`${action.label} clicked`)}
    >
      {action.label}
    </button>
  );
};
