import React from "react";
import type { StatisticCardProps } from "../types";

/**
 * StatisticCard Component
 * Displays a single statistic with icon, label, and value
 * Includes loading state and color coding based on card type
 */
export const StatisticCard: React.FC<StatisticCardProps> = ({
  icon,
  label,
  value,
  testId,
  delay = 0,
  isLoading = false,
}) => {
  const IconComponent = icon;

  /**
   * Determines color based on card type
   * Each statistic card has a specific color scheme
   */
  const getCardColors = (): string => {
    if (testId === "stat-total-patients") return "text-accent-600";
    if (testId === "stat-appointments") return "text-secondary-600";
    if (testId === "stat-active-staff") return "text-accent-600";
    if (testId === "stat-emergency-cases") return "text-error-500";
    return "text-secondary-600";
  };

  return (
    <div
      className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-200 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
      data-testid={testId}
    >
      <div className="flex items-center gap-4">
        <div className={`${getCardColors()}`}>
          <IconComponent className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <div className="flex-1">
          <p className="text-sm md:text-base text-primary-700 mb-1">{label}</p>
          <p className="text-3xl md:text-4xl font-bold text-primary-900">
            {isLoading ? "..." : value}
          </p>
        </div>
      </div>
    </div>
  );
};
