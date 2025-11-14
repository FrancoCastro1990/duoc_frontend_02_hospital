/**
 * Patient Statistics Card Component
 * Reusable card for displaying patient statistics with icons and counts
 */
import React from 'react';
import type { PatientStatCardProps } from '../types';

export const PatientStatCard: React.FC<PatientStatCardProps> = ({
  icon: Icon,
  label,
  value,
  colorClass,
  bgClass,
  borderClass,
  delay,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border-2 ${borderClass}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 ${bgClass} rounded-xl`}>
          <Icon className={`w-8 h-8 ${colorClass}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-primary-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-primary-900">{value}</p>
        </div>
      </div>
    </div>
  );
};
