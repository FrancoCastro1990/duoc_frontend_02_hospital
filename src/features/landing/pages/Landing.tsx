import React from "react";
import {
  Users,
  Heart,
  Activity,
  AlertCircle,
} from "lucide-react";
import { useLanding } from "../hooks/useLanding";
import { LandingService } from "../services/LandingService";
import type { LandingProps } from "../types";
import { FeatureCard, StatisticCard, QuickActionButton } from "../components";

// Create service instance outside component
const landingService = new LandingService();

/**
 * Landing Page Component
 * Main landing page for the Hospital Dashboard featuring hero section,
 * key features showcase, statistics display, and quick action buttons
 */
export const Landing: React.FC<LandingProps> = ({ className = "" }) => {
  const {
    statistics,
    features,
    quickActions,
    isLoading,
    error,
    refreshStatistics,
  } = useLanding(landingService);

  return (
    <div className={`min-h-screen bg-primary-100 ${className}`.trim()}>
      {/* Hero Section */}
      <section className="bg-gradient-secondary p-6 md:p-8 lg:p-10 mb-6 md:mb-10 animate-fade-in-down">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg mb-5">
            <Heart className="w-7 h-7 md:w-8 md:h-8 text-secondary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-4 md:mb-6">
            Hospital Patient Dashboard
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-primary-700 leading-relaxed max-w-3xl mx-auto">
            Manage patient records, medical history, and treatment plans efficiently.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-900">
            Dashboard Overview
          </h2>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white border border-primary-300 rounded-lg hover:bg-primary-50 hover:border-secondary-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            onClick={refreshStatistics}
            disabled={isLoading}
            aria-label="Refresh statistics"
          >
            <Activity className={`w-4 h-4 md:w-5 md:h-5 text-secondary-700 ${isLoading ? "animate-spin" : ""}`} />
            <span className="text-sm md:text-base font-medium text-primary-900">
              {isLoading ? "Loading..." : "Refresh"}
            </span>
          </button>
        </div>

        {error && (
          <div
            className="flex items-center gap-3 bg-error-50 border border-error-200 text-error-700 p-4 rounded-lg mb-6 animate-fade-in"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm md:text-base">{error}</span>
          </div>
        )}

        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <StatisticCard
              icon={Users}
              label="Total Patients"
              value={statistics.totalPatients}
              testId="stat-total-patients"
              delay={0}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-10">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-900 mb-3 md:mb-4">
            Available Features
          </h2>
          <p className="text-base md:text-lg text-primary-600 max-w-2xl mx-auto">
            Currently available functionality in the system
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-900 mb-3 md:mb-4">
            Quick Access
          </h2>
          <p className="text-base md:text-lg text-primary-600 max-w-2xl mx-auto">
            Access patient management quickly
          </p>
        </div>

        <div className="flex justify-center">
          {quickActions.map((action) => (
            <QuickActionButton key={action.id} action={action} />
          ))}
        </div>
      </section>
    </div>
  );
};
