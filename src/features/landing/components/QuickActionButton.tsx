import React from "react";
import { useNavigate } from "react-router-dom";
import type { QuickActionButtonProps } from "../types";

/**
 * QuickActionButton Component
 * Displays a quick action button with variant-based styling
 * Supports primary, secondary, and danger variants
 * Navigates to action.path if provided
 */
export const QuickActionButton: React.FC<QuickActionButtonProps> = ({ action }) => {
  const navigate = useNavigate();
  /**
   * Determines button styles based on variant
   * Primary: Lavender blue, Secondary: Sage green, Danger: Error red with pulse
   */
  const getButtonStyles = (): string => {
    switch (action.variant) {
      case "primary":
        return "bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg hover:shadow-xl";
      case "secondary":
        return "bg-accent-500 hover:bg-accent-600 text-white shadow-lg hover:shadow-xl";
      case "danger":
        return "bg-error-500 hover:bg-error-600 text-white shadow-lg hover:shadow-xl animate-pulse";
      default:
        return "bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg hover:shadow-xl";
    }
  };

  const handleClick = () => {
    if (action.path) {
      navigate(action.path);
    } else {
      console.log(`${action.label} clicked`);
    }
  };

  return (
    <button
      className={`px-8 py-4 md:px-10 md:py-5 rounded-xl font-semibold text-base md:text-lg transition-all duration-200 ${getButtonStyles()}`}
      data-testid={`action-${action.id}`}
      onClick={handleClick}
    >
      {action.label}
    </button>
  );
};
