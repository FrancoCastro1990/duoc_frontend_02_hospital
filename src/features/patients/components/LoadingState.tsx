/**
 * Loading State Component
 * Displays a loading spinner with message
 */
import React from 'react';
import { Loader2 } from 'lucide-react';
import type { LoadingStateProps } from '../types';

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading patient data...',
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-100">
      <div className="flex flex-col items-center gap-6 bg-white rounded-3xl p-12 shadow-md border-2 border-secondary-100">
        <div className="p-4 bg-secondary-50 rounded-full">
          <Loader2 className="w-12 h-12 text-secondary-600 animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-primary-900 mb-2">Loading Patients</p>
          <p className="text-base text-primary-600">{message}</p>
        </div>
      </div>
    </div>
  );
};
